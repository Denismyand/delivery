import { dishes } from "./Menu.js";

export default function Shop() {
  return (
    <div className="ShopContent">
      <Restaurants />
      <Menu />
    </div>
  );
}

function Restaurants() {
  return (
    <div className="RestaurantList">
      <h1>Shops:</h1>
      <button className="RestaurantButton">McDonny</button>
      <button className="RestaurantButton">CFK</button>
      <button className="RestaurantButton">Uncle John's</button>
      <button className="RestaurantButton">Sonimod Pizza</button>
    </div>
  );
}

function Menu() {
  return (
    <>
      <div className="MenuContent">
        <h1>Menu</h1>
      </div>
    </>
  );
}
