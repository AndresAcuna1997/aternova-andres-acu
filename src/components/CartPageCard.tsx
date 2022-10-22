import CartProduct from "../interfaces/CartProduct.interface";

export const CartPageCard = ({
  name,
  quantity,
  stock,
  unit_price,
}: CartProduct) => {
  return (
    <div className="cart-card">
      <h4 className="cart-card__title"> Name: {name} </h4>
      <p className="cart-card__qty"> Quantity: {quantity} </p>
      <p className="cart-card__unit-price"> Unit price: {`$${unit_price}`} </p>
      <p className="cart-card__total-price">
        Total product price: {`$${quantity * unit_price}`}
      </p>
    </div>
  );
};
