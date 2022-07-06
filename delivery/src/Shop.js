import { dishes } from "./Menu.js";
import { useState } from "react";

export default function Shop() {
  let mcMenu = dishes.filter((dish) => dish.restaurant === "McDonny");
  let cfkMenu = dishes.filter((dish) => dish.restaurant === "CFK");
  let johnsMenu = dishes.filter((dish) => dish.restaurant === "Uncle John's");
  let sonimodMenu = dishes.filter(
    (dish) => dish.restaurant === "Sonimod Pizza"
  );

  const [menu, setMenu] = useState(mcMenu);
  function chooseMenu(brand) {
    setMenu(brand);
  }

  return (
    <div className="ShopContent">
      <Restaurants
        chooseMenu={chooseMenu}
        mcMenu={mcMenu}
        cfkMenu={cfkMenu}
        johnsMenu={johnsMenu}
        sonimodMenu={sonimodMenu}
      />
      <Menu menu={menu} />
    </div>
  );
}

function Restaurants({ chooseMenu, mcMenu, cfkMenu, johnsMenu, sonimodMenu }) {
  return (
    <div className="RestaurantList">
      <h1>Shops:</h1>
      <div className="RestaurantButtonBar">
        <button className="RestaurantButton" onClick={() => chooseMenu(mcMenu)}>
          McDonny
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseMenu(cfkMenu)}
        >
          CFK
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseMenu(johnsMenu)}
        >
          Uncle John's
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseMenu(sonimodMenu)}
        >
          Sonimod Pizza
        </button>
      </div>
    </div>
  );
}

function Menu({ menu }) {
  return (
    <>
      <div className="MenuContent">
        {menu.map((dish) => (
          <div className="Dish" key={dish.id}>
            <img
              src={dish.image}
              alt={dish.product}
              width="100%"
              height="83%"
            />
            <div>
              <p className="DishName">{dish.product}</p>
              <button className="AddToCart">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
