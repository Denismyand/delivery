import { dishes } from "./Menu.js";
import { useState } from "react";

export default function Cart() {
  return (
    <div className="CartContent">
      <div className="PersonalInfo">
        <Input toinput="name" />
        <Input toinput="email" />
        <Input toinput="phone" />
        <Input toinput="address" />
      </div>
      <div className="Cart"></div>
      <div className="CartTotal">
        <p>Total price:</p>
      </div>
        <button className="CartSubmit">Submit</button>
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
      <input placeholder={`Enter your ${toinput}`} />
    </div>
  );
}
