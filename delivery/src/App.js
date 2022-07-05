import "./App.css";
import Shop from "./Shop.js";
import Cart from "./Cart.js";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Footer />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function Footer() {
  return (
    <div className="Footer">
        <Link className="ShopLink" to="/">Shop</Link>
      <div className="VerticalLine"></div>
        <Link className="CartLink" to="cart">Cart</Link>
    </div>
  );
}
