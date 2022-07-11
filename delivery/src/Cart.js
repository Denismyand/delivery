import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Map from "./Map.js";
import ReCAPTCHA from "react-google-recaptcha";

export default function Cart({
  cart,
  setCart,
  handleAddToCart,
  handleDecreaseQuantity,
  createNotification,
}) {
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [cachedOrders, setCachedOrders] = useState(
    JSON.parse(localStorage.getItem("orders"))
  );
  const [orders, setOrders] = useState(isCached());

  function isCached() {
    if (cachedOrders) {
      return cachedOrders;
    } else return [];
  }
  let total = 0;

  function getOrder() {
    setOrders([
      ...orders,
      {
        id: uuidv4(),
        customer_name: custName,
        customer_email: custEmail,
        customer_phone: custPhone,
        customer_address: custAddress,
        ordered_items: cart,
      },
    ]);
    setCustName("");
    setCustEmail("");
    setCustPhone("");
    setCustAddress("");
  }
  function captcha(value) {
    console.log("Captcha value:", value);
    setIsVerified(!isVerified);
  }

  function cartTotal() {
    if (cart) {
      cart.forEach((dish) => {
        if (dish.cartQuantity) {
          total += dish.cost * dish.cartQuantity;
        }
      });
      return total + "₴";
    } else return "0";
  }

  function handleChangeQuantity(dish, e) {
    let changed = cart.map((cartItem) => {
      if (cartItem.id === dish.id) {
        return { ...cartItem, cartQuantity: e.target.value };
      } else return cartItem;
    });
    setCart(changed);
  }

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    setCachedOrders(JSON.parse(localStorage.getItem("orders")));
  }, [orders]);

  return (
    <div className="CartContent">
      <div className="PersonalInfo">
        <Map
          setCustAddress={setCustAddress}
          custAddress={custAddress}
          cart={cart}
        />
        <Input
          toinput="name"
          value={custName}
          onChange={(e) => setCustName(e.target.value)}
        />
        <Input
          toinput="email"
          value={custEmail}
          onChange={(e) => setCustEmail(e.target.value)}
        />
        <Input
          toinput="phone"
          value={custPhone}
          onChange={(e) => setCustPhone(e.target.value)}
        />
        <Input toinput="address" value={custAddress} disabled={true} />
      </div>
      <div className="CartSection">
        <div className="Cart">
          <CartItems
            cart={cart}
            handleChangeQuantity={handleChangeQuantity}
            handleAddToCart={handleAddToCart}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
        </div>
        <div className="CartTotalSection">
          {cart.length > 0 ? (
            <div className="Captcha">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={captcha}
              />
            </div>
          ) : null}

          <div className="CartTotal">
            <p>Total price: {cartTotal()}</p>
          </div>
          <button
            className="CartSubmit"
            disabled={
              cart.length < 1 ||
              custName === "" ||
              custPhone === "" ||
              custEmail === "" ||
              custAddress === "" ||
              !isVerified
            }
            onClick={() => {
              getOrder();
              setCart([]);
              createNotification("ordered");
            }}
          >
            <b>Submit</b>
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ toinput, value, onChange, disabled }) {
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <p className="InfoFieldName">{Capitalize(toinput) + ":"}</p>
      <input
        className="InfoField"
        placeholder={`Enter your ${toinput}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function CartItems({
  cart,
  handleChangeQuantity,
  handleAddToCart,
  handleDecreaseQuantity,
}) {
  return cart.length > 0 ? (
    cart.map((dish) => {
      return (
        <div className="CartItem" key={dish.id}>
          <img
            src={dish.image}
            alt={dish.name}
            width="325px"
            height="300px"
            style={{ overflow: "hidden" }}
          />
          <div className="CartItemDescription">
            <div className="CartItemName">{dish.product}</div>
            <div className="CartItemCost">
              Price: {dish.cost * dish.cartQuantity}₴
            </div>
            <div className="CartItemQuantity">
              <input
                className="CartQuantityInput"
                type="number"
                value={dish.cartQuantity}
                onChange={(e) => handleChangeQuantity(dish, e)}
              ></input>
              <div className="CartQuantityButtons">
                <button
                  className="ArrowButtonTop"
                  onClick={() => handleAddToCart(dish)}
                >
                  ▲
                </button>
                <button
                  className="ArrowButtonBottom"
                  onClick={() => handleDecreaseQuantity(dish)}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h1 className="EmptyCart">Your cart is empty</h1>
  );
}
