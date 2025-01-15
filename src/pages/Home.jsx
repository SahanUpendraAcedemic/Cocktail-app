import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import FavModel from '../modal/favModel';
import userfavorites from '../hooks/favorites';

export default function Home() {
    const [cocktails,setCocktails] = useState([]);
    const [search,setSearch] = useState("");
    const [results,setResults] = useState([]);
    const [favorites,setFavorites] = useState([]);
    const [loading,setLoading] = useState(false);
    const {removeFavorite,addfavDrinks,favDrinks} = userfavorites();
    const [isModelOpen,setIsModelOpen] = useState(false);

    const fetchCocktails = async () => {
        setLoading(true);
        const promises = Array.from({ length: 5 }, () => axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php"));
        const responses = await Promise.all(promises);
        const drinksMap = new Map();
        responses.forEach(response => {
            response.data.drinks.forEach(drink => {
                drinksMap.set(drink.idDrink, drink);
            });
        });
        setCocktails(Array.from(drinksMap.values()));
        setLoading(false);
    }

    const handelSearch = async () => {
        setLoading(true);
        const serch = axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        const response = await serch;
        setResults(response.data.drinks || []);
        setLoading(false);
    }
    const showFavorites = () => {
        setFavorites(favDrinks);
    };

    useEffect(() => {
        fetchCocktails();
    },[]);

  return (
        <div className='p-10'>
            <h1 className='flex text-5xl font-bold'>Cocktails</h1>
        <div className='flex justify-between flex-row'>
            <p className='flex justify-start'>Here are some cocktails that suits for you.</p>
            <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={fetchCocktails} disabled={loading}>Refresh</button>
        </div>
        <div className='flex justify-center flex-row m-10'>
            { loading ? (<p>"Loading"</p>) : (cocktails.map(cocktail => (
                <div>
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
                </div>
            )))}
        </div>
        <div className='flex justify-center gap-5 flex-row mt-5'>
            <p className='flex justify-center p-2'>Doesn't fit to your liking? Hit refresh or search for your favorites!</p>
            <input className=' border border-lg h-15 rounded-lg p-2 hover:border-black' type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={handelSearch}>Search</button>
            <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={()=>setIsModelOpen(true)}>Favorites</button>
        </div>
        <div className='flex justify-center flex-row m-10'>
            {results.map(cocktail => (
                <div className='flex flex-col justify-start max-h-md hover:bg-grey-300 shadow-md border-2 border-gray-200 rounded-lg p-4 m-4  hover:shadow-lg hover:scale-110 '>
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
                <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={() => addfavDrinks(cocktail)}>Add to Favorites</button>
                </div>
            ))}
        </div>
        <div className='flex justify-center flex-row m-10'>
            {favorites.map(cocktail => (
                <div className='flex flex-col justify-start max-h-md hover:bg-grey-300 shadow-md border-2 border-gray-200 rounded-lg p-4 m-4  hover:shadow-lg hover:scale-110 '>
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
                </div>
            ))}
        </div>
        <FavModel isOpen={isModelOpen} isClose={()=>setIsModelOpen(false)} favDrinks={favorites} removeFavorite={removeFavorite}/>
    </div>
  )
}
