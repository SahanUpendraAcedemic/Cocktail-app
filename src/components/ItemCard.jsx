import React from 'react'

const ItemCard = ({cocktail}) => {

    const {strDrink,strDrinkThumb,strInstructions,strCategory} = cocktail;

  return (
    <div className='flex flex-col justify-between max-h-md hover:bg-grey-300 shadow-md border-2 border-gray-200 rounded-lg p-4 m-4  hover:shadow-lg hover:scale-110 '>
        <div>
            <img className='object-contain size-20 rounded-lg' src={strDrinkThumb} alt={strDrink} />
        </div>
        <div>
            <h2 className='font-bold'>{strDrink}</h2>
            <p>{strCategory}</p>
            
        </div>
    </div>
  )
}

export default ItemCard;
