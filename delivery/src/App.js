import "./App.css";
import { dishes } from "./Menu.js";

import Shop from "./Shop.js";
import Cart from "./Cart.js";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [cached, setCached] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const [menu, setMenu] = useState(dishes);
  const [cart, setCart] = useState(isCached());

  function isCached() {
    if (cached) {
      return cached;
    } else return [];
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCached(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  return (
    <div>
      <Footer />
      <Routes>
        <Route
          path="/"
          element={<Shop menu={menu} cart={cart} setCart={setCart} />}
        />
        <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

function Footer() {
  return (
    <div className="Footer">
      <Link className="ShopLink" to="/">
        Shop
      </Link>
      <div className="VerticalLine"></div>
      <Link className="CartLink" to="cart">
        Cart
      </Link>
    </div>
  );
}
