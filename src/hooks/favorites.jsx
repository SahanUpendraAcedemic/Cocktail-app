import { useState } from "react";

const favorites = () => {
    const [favDrinks,setfavDrinks] = useState([]);

    const favoriteDrink = (drink) => {
        if(!favDrinks.find((favDrink) => favDrink.idDrink === drink.idDrink)){
            setfavDrinks([...favDrinks,drink]);
        }
        console.log(favDrinks);
    }

    const removeFavorite = (drink) => {
        setfavDrinks(favDrinks.filter((favDrink) => favDrink.idDrink !== drink.idDrink));
    }

    return {favDrinks,favoriteDrink,removeFavorite};
};

export default favorites;