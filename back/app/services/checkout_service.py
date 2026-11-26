from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.cart import Cart
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.schemas.order_schemas import CheckoutRequest


class CheckoutError(Exception):
	"""Erreur métier du checkout."""


class EmptyCartError(CheckoutError):
	pass


class InsufficientStockError(CheckoutError):
	def __init__(self, product_name: str, available: int):
		self.product_name = product_name
		self.available = available
		super().__init__(
			f"Stock insuffisant pour « {product_name} » (disponible : {available})"
		)


def checkout(db: Session, user_id: int, data: CheckoutRequest) -> Order:
	try:
		cart = db.scalars(
			select(Cart)
			.where(Cart.user_id == user_id)
			.options(selectinload(Cart.items))
		).first()
		if cart is None or not cart.items:
			raise EmptyCartError("Le panier est vide")

		# Verrouille les produits, triés par id pour éviter les deadlocks
		product_ids = [item.product_id for item in cart.items]
		products = {
			p.id: p
			for p in db.scalars(
				select(Product)
				.where(Product.id.in_(product_ids))
				.order_by(Product.id)
				.with_for_update()
			)
		}

		order = Order(
			user_id=user_id,
			status=OrderStatus.PENDING,
			total_cents=0,
			shipping_name=data.shipping_name,
			shipping_address=data.shipping_address,
			shipping_postal_code=data.shipping_postal_code,
			shipping_city=data.shipping_city,
			shipping_country=data.shipping_country,
		)

		total_cents = 0
		for item in cart.items:
			product = products[item.product_id]
			if product.stock < item.quantity:
				raise InsufficientStockError(product.name, product.stock)

			product.stock -= item.quantity
			unit_price_cents = round(product.price * 100)
			total_cents += unit_price_cents * item.quantity

			order.items.append(
				OrderItem(
					product_id=product.id,
					product_name=product.name,
					color=product.color,
					size=product.size,
					unit_price_cents=unit_price_cents,
					quantity=item.quantity,
				)
			)

		order.total_cents = total_cents
		db.add(order)
		cart.items.clear()      # vide le panier (delete-orphan supprime les lignes)

		db.commit()
		db.refresh(order)
		return order
	except Exception:
		db.rollback()           # annule aussi les décrémentations de stock
		raise
