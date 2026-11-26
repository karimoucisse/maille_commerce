from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.exceptions import ConflictError, NotFoundError
from app.models.cart import Cart, CartItem
from app.models.product import Product


def get_cart(db: Session, user_id: int) -> Cart:
	"""Renvoie le panier de l'utilisateur (le crée s'il n'existe pas)."""
	cart = db.scalars(
		select(Cart)
		.where(Cart.user_id == user_id)
		.options(selectinload(Cart.items).selectinload(CartItem.product))
	).first()
	if cart is None:
		cart = Cart(user_id=user_id)
		db.add(cart)
		db.commit()
		db.refresh(cart)
	return cart


def _find_item(cart: Cart, item_id: int) -> CartItem:
	item = next((i for i in cart.items if i.id == item_id), None)
	if item is None:
		raise NotFoundError("Ligne de panier introuvable")
	return item


def add_item(db: Session, user_id: int, product_id: int, quantity: int) -> Cart:
	product = db.get(Product, product_id)
	if product is None:
		raise NotFoundError("Produit introuvable")

	cart = get_cart(db, user_id)
	existing = next((i for i in cart.items if i.product_id == product_id), None)
	new_quantity = (existing.quantity if existing else 0) + quantity

	# Vérification "de confort" : la vraie garantie se fait au checkout (avec verrou)
	if new_quantity > product.stock:
		raise ConflictError(f"Stock insuffisant (disponible : {product.stock})")

	if existing:
		existing.quantity = new_quantity
	else:
		cart.items.append(CartItem(product_id=product_id, quantity=quantity))
	db.commit()
	return get_cart(db, user_id)


def update_item(db: Session, user_id: int, item_id: int, quantity: int) -> Cart:
	cart = get_cart(db, user_id)
	item = _find_item(cart, item_id)
	if quantity > item.product.stock:
		raise ConflictError(f"Stock insuffisant (disponible : {item.product.stock})")
	item.quantity = quantity
	db.commit()
	return get_cart(db, user_id)


def remove_item(db: Session, user_id: int, item_id: int) -> Cart:
	cart = get_cart(db, user_id)
	item = _find_item(cart, item_id)
	cart.items.remove(item)        # delete-orphan supprime la ligne en base
	db.commit()
	return get_cart(db, user_id)
