import "./App.css";
import "react-notifications/lib/notifications.css";
import { dishes } from "./Menu.js";
import { theme, ButtonFooter } from "./MuiCustomized.js";
import Shop from "./Shop.js";
import Cart from "./Cart.js";
import { ThemeProvider } from "@mui/system";

import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function createNotification(type, dish, cartItem) {
  function ifInCart(cartItem) {
    if (cartItem) {
      return `Quantity in cart: ${cartItem.cartQuantity + 1}`;
    } else return "Quantity in cart: 1";
  }
  switch (type) {
    case "added":
      NotificationManager.success(
        `${ifInCart(cartItem)}`,
        `Added ${dish.product} to cart`
      );
      break;

    case "removed":
      NotificationManager.error(
        "",
        `Removed ${dish.product} from cart`,
        5000,
        () => {
          alert("callback");
        }
      );
      break;

    case "ordered":
      NotificationManager.success(``, `Order Placed!`);
      break;
  }
}

export default function App() {
  const [cached, setCached] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  let menu = dishes;
  const [cart, setCart] = useState(isCached());

  function isCached() {
    if (cached) {
      return cached;
    } else return [];
  }

  function handleAddToCart(dish) {
    let foundInCart = cart.find((cartItem) => cartItem.id === dish.id);
    if (foundInCart) {
      let nextCart = cart.map((food) => {
        if (food.id === foundInCart.id) {
          return {
            ...foundInCart,
            cartQuantity: Number(foundInCart.cartQuantity) + 1,
          };
        } else return food;
      });
      setCart(nextCart);
    } else {
      setCart([...cart, { ...dish, cartQuantity: 1 }]);
    }
    createNotification("added", dish, foundInCart);
  }

  function handleDecreaseQuantity(dish) {
    if (dish.cartQuantity > 1) {
      let decreased = cart.map((cartItem) => {
        if (cartItem.id === dish.id) {
          return {
            ...cartItem,
            cartQuantity: Number(cartItem.cartQuantity) - 1,
          };
        } else return cartItem;
      });
      setCart(decreased);
    } else {
      setCart(cart.filter((item) => item.id !== dish.id));
      createNotification("removed", dish);
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCached(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  return (
    <ThemeProvider theme={theme}>
      <Footer />
      <Routes>
        <Route
          path="/"
          element={
            <Shop
              cart={cart}
              setCart={setCart}
              menu={menu}
              handleAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              handleAddToCart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
              createNotification={createNotification}
            />
          }
        />
      </Routes>
      <NotificationContainer />
    </ThemeProvider>
  );
}

function Footer() {
  return (
    <div className="Footer">
      <Link className="Link" to="/">
        <ButtonFooter>Shop </ButtonFooter>
      </Link>

      <div className="VerticalLine"></div>
      <Link className="Link" to="cart">
        <ButtonFooter>Cart </ButtonFooter>
      </Link>
    </div>
  );
}

