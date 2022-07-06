import { dishes } from "./Menu.js";
import { useState, useEffect } from "react";

export default function Shop() {
  localStorage.clear();
  let cached = JSON.parse(localStorage.getItem("menu"));
  const [menu, setMenu] = useState(firstRender());
  function firstRender() {
    if (cached) {
      return cached;
    } else return dishes;
  }

  let mcMenu = menu.filter((dish) => dish.restaurant === "McDonny");
  let cfkMenu = menu.filter((dish) => dish.restaurant === "CFK");
  let johnsMenu = menu.filter((dish) => dish.restaurant === "Uncle John's");
  let sonimodMenu = menu.filter((dish) => dish.restaurant === "Sonimod Pizza");

  const [restaurant, setRestaurant] = useState(mcMenu);

  function chooseRestaurant(brand) {
    setRestaurant(brand);
  }

  function handleAddToCart(dish) {
    let cartAdded = menu.map((menuItem) => {
      if (menuItem.id === dish.id) {
        if (dish.cartQuantity) {
          {
            return { ...menuItem, cartQuantity: dish.cartQuantity + 1 };
          }
        } else {
          return { ...menuItem, cartQuantity: 1 };
        }
      } else return menuItem;
    });
    setMenu(cartAdded);
  }

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  return (
    <div className="ShopContent">
      <Restaurants
        chooseRestaurant={chooseRestaurant}
        mcMenu={mcMenu}
        cfkMenu={cfkMenu}
        johnsMenu={johnsMenu}
        sonimodMenu={sonimodMenu}
      />
      <Menu restaurant={restaurant} handleAddToCart={handleAddToCart} />
    </div>
  );
}

function Restaurants({
  chooseRestaurant,
  mcMenu,
  cfkMenu,
  johnsMenu,
  sonimodMenu,
}) {
  return (
    <div className="RestaurantList">
      <h1>Shops:</h1>
      <div className="RestaurantButtonBar">
        <button
          className="RestaurantButton"
          onClick={() => chooseRestaurant(mcMenu)}
        >
          McDonny
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseRestaurant(cfkMenu)}
        >
          CFK
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseRestaurant(johnsMenu)}
        >
          Uncle John's
        </button>
        <button
          className="RestaurantButton"
          onClick={() => chooseRestaurant(sonimodMenu)}
        >
          Sonimod Pizza
        </button>
      </div>
    </div>
  );
}

function Menu({ restaurant, handleAddToCart }) {
  return (
    <>
      <div className="MenuContent">
        {restaurant.map((dish) => (
          <div className="Dish" key={dish.id}>
            <img
              src={dish.image}
              alt={dish.product}
              width="100%"
              height="83%"
            />
            <div>
              <p className="DishName">{dish.product}</p>
              <button
                className="AddToCart"
                onClick={() => handleAddToCart(dish)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
