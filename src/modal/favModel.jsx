import React from "react";

const favModel = ({ isOpen,isClose, favDrinks, removeFavorite }) => {
    if (!isOpen) return null;
    console.log(favDrinks);

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5 m-5">
            <div className="bg-white p-5 rounded-lg max-w-lg w-11/12 shadow-lg relative text-center">
                <button className="absolute top-2 right-2 bg-transparent border-none text-lg cursor-pointer" onClick={isClose}>Close</button>
                <h2 className="text-2xl font-bold mb-4">Favorites</h2>
                {favDrinks.length > 0 ? (
          <ul className="favorites-list">
            {favDrinks.map((cocktail) => (
              <li key={cocktail.idDrink} className="favorite-item">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="favorite-image"
                />
                <div className="favorite-info">
                  <h3>{cocktail.strDrink}</h3>
                  <button onClick={() => onRemove(cocktail.idDrink)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}

            </div>
        </div>
    )
};

export default favModel;