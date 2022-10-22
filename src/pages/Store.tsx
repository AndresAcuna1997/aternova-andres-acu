import { Header } from "../components/Header";
import { StorePageCard } from "../components/StorePageCard";
import { useEffect, useState } from "react";

import axios from "axios";
import CartProduct from "../interfaces/CartProduct.interface";
import Product from "../interfaces/Product.interface";
import { CartPageCard } from "../components/CartPageCard";
import { ErrorMessage } from "../components/ErrorMessage";

const alarmInitialState = {
  message: "",
  error: false,
  show: false,
};

export const Store = () => {
  const [first, setfirst] = useState<Product[] | []>([]);

  const [cart, setCart] = useState<CartProduct[] | []>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [informationData, setInformationData] = useState(alarmInitialState);

  const fetchData = async () => {
    const { data } = await axios.get("./products.json");
    setfirst(data.products);
  };

  const addToCart = (product: CartProduct | never): void => {
    //Check if is a valid input
    if (product.stock === 0) {
      return setInformationData({
        message: "No stock for this product",
        error: true,
        show: true,
      });
    }

    const existProductInCart = cart.find(
      (cartProdut) => cartProdut.name === product.name
    );

    //Check if the product already exist
    if (existProductInCart) {
      const indexInCart = cart.findIndex(
        (cartProdut) => cartProdut.name === product.name
      );

      //Check if products does have enough stock
      if (product.quantity + cart[indexInCart].quantity > product.stock) {
        return setInformationData({
          message: "Product doesn't have enough stock ",
          error: true,
          show: true,
        });
      }

      existProductInCart.quantity =
        existProductInCart.quantity + product.quantity;

      let newCart: CartProduct[];

      newCart = [...cart];

      newCart.forEach((cartProduct) => {
        if (cartProduct.name === product.name) {
          cartProduct = existProductInCart;
        }
      });

      setCart(newCart);
    } else {
      setCart((prev) => [...prev, product]);
      setInformationData({
        message: "Product Added",
        error: false,
        show: true,
      });
    }
  };

  const calculateTotalPrice = (): void => {
    let totalPrice: number = 0;

    cart.forEach((e) => {
      totalPrice = totalPrice + e.quantity * e.unit_price;
    });

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setInformationData(alarmInitialState);
    }, 3500);
  }, [informationData.show]);

  return (
    <>
      <Header />

      <main className="store-content">
        <div className="store-content__grid">
          {first?.map(({ name, stock, unit_price }) => (
            <StorePageCard
              key={name}
              name={name}
              stock={stock}
              unit_price={unit_price}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div className="store-content__cart">
          {cart?.map(({ name, unit_price, stock, quantity }, i) => (
            <CartPageCard
              key={i}
              name={name}
              unit_price={unit_price}
              stock={stock}
              quantity={quantity}
            />
          ))}

          {cart?.length > 0 ? (
            <div className="store-content__total-price">
              <button className="btn">Create an Order</button>
              <h2>Total Price: $ {totalPrice}</h2>
            </div>
          ) : (
            <h2>Your Shopping cart is empty</h2>
          )}
        </div>
      </main>

      {informationData.show ? (
        <ErrorMessage
          message={informationData.message}
          error={informationData.error}
          show={informationData.show}
        />
      ) : null}
    </>
  );
};
