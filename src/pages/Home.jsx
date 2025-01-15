import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

export default function Home() {
    const [cocktails,setCocktails] = useState([]);
    const [search,setSearch] = useState("");
    const [results,setResults] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchCocktails = async () => {
        const promises = Array.from({ length: 5 }, () => axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php"));
        const responses = await Promise.all(promises);
        const drinksMap = new Map();
        responses.forEach(response => {
            response.data.drinks.forEach(drink => {
                drinksMap.set(drink.idDrink, drink);
            });
        });
        setCocktails(Array.from(drinksMap.values()));
    }

    const handelSearch = async () => {
        const serch = axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        const response = await serch;
        setResults(response.data.drinks || []);
    }

    useEffect(() => {
        fetchCocktails();
    },[]);
    console.log(cocktails);

  return (
        <div>
        <div className='flex justify-between'>
        <h1 className='flex font-md'>Cocktails</h1>
        <p>Here are some cocktails that suits for you.</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Refresh</button>
        </div>
        <div>
            {cocktails.map(cocktail => (
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </div>
        <div>
            <input className='h-10 rounded-lg' type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handelSearch}>Search</button>
        </div>
        <div>
            {results.map(cocktail => (
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </div>
    </div>
  )
}
