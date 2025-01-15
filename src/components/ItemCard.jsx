import React from 'react'

const ItemCard = ({cocktail}) => {

    const {strDrink,strDrinkThumb,strInstructions} = cocktail;

  return (
    <div className='flex max-h-sm'>
        <div>
            <img className='size-0' src={strDrinkThumb} alt={strDrink} />
        </div>
        <div>
            <h2>{strDrink}</h2>
            <p>{strInstructions}</p>
        </div>
    </div>
  )
}

export default ItemCard;
