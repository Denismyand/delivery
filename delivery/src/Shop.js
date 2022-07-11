import { useState } from "react";
import { Stack } from "@mui/material";
import { ButtonRestaurant } from "./Muibutton.js";

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
      <Stack alignItems="center" spacing="40px" direction="column" j>
        <ButtonRestaurant
          variant="contained"
          color="primary"
          size="large"
          disabled={cart.length > 0}
          onClick={() => chooseRestaurant(mcMenu)}
        >
          McDonny
        </ButtonRestaurant>
        <ButtonRestaurant
          variant="contained"
          color="primary"
          size="large"
          disabled={cart.length > 0}
          onClick={() => chooseRestaurant(cfkMenu)}
        >
          CFK
        </ButtonRestaurant>
        <ButtonRestaurant
          variant="contained"
          color="primary"
          size="large"
          disabled={cart.length > 0}
          onClick={() => chooseRestaurant(johnsMenu)}
        >
          Uncle John's
        </ButtonRestaurant>
        <ButtonRestaurant
          variant="contained"
          color="primary"
          size="large"
          disabled={cart.length > 0}
          onClick={() => chooseRestaurant(sonimodMenu)}
        >
          Sonimod Pizza
        </ButtonRestaurant>
      </Stack>
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
