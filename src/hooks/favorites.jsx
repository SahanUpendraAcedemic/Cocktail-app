import { useState } from "react";

const userfavorites = () => {
    const [favDrinks,setfavDrinks] = useState([]);

    const addfavDrinks = (drink) => {
        if(!favDrinks.find((favDrink) => favDrink.idDrink === drink.idDrink)){
            setfavDrinks([...favDrinks,drink]);
        }
        console.log(favDrinks);
    }

    const removeFavorite = (drink) => {
        setfavDrinks(favDrinks.filter((favDrink) => favDrink.idDrink !== drink.idDrink));
    }

    return {favDrinks,addfavDrinks,removeFavorite};
};

export default userfavorites;