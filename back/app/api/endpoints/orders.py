# POST /orders (checkout), GET /orders, GET /orders/{id}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.order_schemas import CheckoutRequest, OrderOut
from app.services import checkout_service
from app.services.checkout_service import EmptyCartError, InsufficientStockError

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=201)
def create_order(
	data: CheckoutRequest,
	db: Session = Depends(get_db),
	user: User = Depends(get_current_user),
):
	try:
		return checkout_service.checkout(db, user.id, data)
	except EmptyCartError as e:
		raise HTTPException(status_code=400, detail=str(e))
	except InsufficientStockError as e:
		raise HTTPException(status_code=409, detail=str(e))
