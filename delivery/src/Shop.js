import { useState } from "react";

export default function Shop({ menu, cart, handleAddToCart }) {
  let mcMenu = menu.filter((dish) => dish.restaurant === "McDonny");
  let cfkMenu = menu.filter((dish) => dish.restaurant === "CFK");
  let johnsMenu = menu.filter((dish) => dish.restaurant === "Uncle John's");
  let sonimodMenu = menu.filter((dish) => dish.restaurant === "Sonimod Pizza");
  const [restaurant, setRestaurant] = useState(mcMenu);

  function chooseRestaurant(brand) {
    setRestaurant(brand);
  }

  return (
    <div className="ShopContent">
      <Restaurants
        chooseRestaurant={chooseRestaurant}
        mcMenu={mcMenu}
        cfkMenu={cfkMenu}
        johnsMenu={johnsMenu}
        sonimodMenu={sonimodMenu}
        cart={cart}
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
  cart,
}) {
  return (
    <div className="RestaurantList">
      <h1>Shops:</h1>
      <div className="RestaurantButtonBar">
        <button
          disabled={cart.length > 0}
          className="RestaurantButton"
          onClick={() => chooseRestaurant(mcMenu)}
        >
          McDonny
        </button>
        <button
          disabled={cart.length > 0}
          className="RestaurantButton"
          onClick={() => chooseRestaurant(cfkMenu)}
        >
          CFK
        </button>
        <button
          disabled={cart.length > 0}
          className="RestaurantButton"
          onClick={() => chooseRestaurant(johnsMenu)}
        >
          Uncle John's
        </button>
        <button
          disabled={cart.length > 0}
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
              className="MenuDishImage"
              src={dish.image}
              alt={dish.product}
              width="100%"
              height="100%"
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
