import Product from "../interfaces/Product.interface";
import CartProduct from "../interfaces/CartProduct.interface";
import { useState } from "react";

interface Props extends Product {
  addToCart: (Product: CartProduct) => void;
}

export const StorePageCard = ({
  name,
  unit_price,
  stock,
  addToCart,
}: Props): JSX.Element => {
  const [input, setInput] = useState<number>(1);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(e.target.value) > stock) {
      return setInput(stock);
    }

    setInput(Number(e.target.value));
  };

  return (
    <div className="store-card">
      <img
        className="store-card__image"
        src="./logo192.png"
        alt="product-image"
      />
      <h3 className="store-card__title">{name}</h3>
      <h2 className="store-card__price">$ {unit_price} p/u</h2>
      <p className="store-card__stock">{stock} products avaliable</p>
      <span>
        <input
          type="number"
          className="quantity"
          value={input}
          onChange={(e) => handleInput(e)}
          min="0"
        />
        <button
          onClick={() =>
            addToCart({ name, unit_price, stock, quantity: input })
          }
          className="btn"
        >
          Add to card
        </button>
      </span>
    </div>
  );
};
