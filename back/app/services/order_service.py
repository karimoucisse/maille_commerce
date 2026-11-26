from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.exceptions import ConflictError, NotFoundError
from app.models.order import Order, OrderStatus
from app.models.product import Product


def list_for_user(db: Session, user_id: int) -> list[Order]:
	return list(
		db.scalars(
			select(Order)
			.where(Order.user_id == user_id)
			.options(selectinload(Order.items))
			.order_by(Order.id.desc())
		)
	)


def get_for_user(db: Session, user_id: int, order_id: int) -> Order:
	order = db.scalars(
		select(Order)
		.where(Order.id == order_id, Order.user_id == user_id)
		.options(selectinload(Order.items))
	).first()
	if order is None:                      # 404 aussi si elle appartient à quelqu'un d'autre
		raise NotFoundError("Commande introuvable")
	return order


def list_all(
	db: Session, status: OrderStatus | None = None, limit: int = 50, offset: int = 0
) -> list[Order]:
	stmt = select(Order).options(selectinload(Order.items)).order_by(Order.id.desc())
	if status:
		stmt = stmt.where(Order.status == status)
	return list(db.scalars(stmt.limit(limit).offset(offset)))


def set_status(db: Session, order_id: int, new_status: OrderStatus) -> Order:
	order = db.scalars(
		select(Order)
		.where(Order.id == order_id)
		.options(selectinload(Order.items))
		.with_for_update()
	).first()
	if order is None:
		raise NotFoundError("Commande introuvable")
	if order.status == OrderStatus.CANCELLED:
		raise ConflictError("Une commande annulée ne peut plus être modifiée")

	# Annulation : on rend le stock
	if new_status == OrderStatus.CANCELLED:
		ids = sorted(i.product_id for i in order.items if i.product_id is not None)
		products = {
			p.id: p
			for p in db.scalars(
				select(Product).where(Product.id.in_(ids)).order_by(Product.id).with_for_update()
			)
		}
		for item in order.items:
			if item.product_id in products:
				products[item.product_id].stock += item.quantity

	order.status = new_status
	db.commit()
	db.refresh(order)
	return order
