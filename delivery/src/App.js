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
    <>
      <Link to="/">Shop</Link>
      <Link to="cart">Cart</Link>
    </>
  );
}
