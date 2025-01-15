import React from 'react'

const ItemCard = ({cocktail}) => {

    const {strDrink,strDrinkThumb,strInstructions} = cocktail;

  return (
    <div className='flex flex-col justify-between max-h-sm border-2 border-gray-200 rounded-lg p-4 m-4'>
        <div>
            <img className='object-contain size-20 rounded-lg' src={strDrinkThumb} alt={strDrink} />
        </div>
        <div>
            <h2 className='font-bold'>{strDrink}</h2>
            
        </div>
    </div>
  )
}

export default ItemCard;
