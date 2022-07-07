import { dishes } from "./Menu.js";

export default function Cart({ cart, setCart }) {
  let total = 0;

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

  return (
    <div className="CartContent">
      <div className="PersonalInfo">
        <Input toinput="name" />
        <Input toinput="email" />
        <Input toinput="phone" />
        <Input toinput="address" />
      </div>
      <div className="Cart">
        <CartItems cart={cart} />
      </div>
      <div className="CartTotal">
        <p>Total price: {cartTotal()}</p>
      </div>
      <button
        className="CartSubmit"
        onClick={() => {
          localStorage.clear();
          setCart(dishes.filter((item) => item.cartQuantity));
        }}
      >
        Submit
      </button>
    </div>
  );
}

function Input({ toinput }) {
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <p>{Capitalize(toinput) + ":"}</p>
      <input className="InfoField" placeholder={`Enter your ${toinput}`} />
    </div>
  );
}

function CartItems({ cart }) {
  return cart.length > 0 ? (
    cart.map((dish) => {
      return (
        <div className="CartItem" key={dish.id}>
          <img
            src={dish.image}
            alt={dish.name}
            width="285px"
            height="250px"
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
                value={dish.cartQuantity}
              ></input>
              <div className="CartQuantityButtons">
                <button className="ArrowButtonTop">▲</button>
                <button className="ArrowButtonBottom">▼</button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h1>Your cart is empty</h1>
  );
}
