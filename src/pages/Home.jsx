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
        setLoading(true);
        const serch = axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        const response = await serch;
        setResults(response.data.drinks || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchCocktails();
    },[]);
    console.log(cocktails);

  return (
        <div className='p-10'>
            <h1 className='flex text-5xl font-bold'>Cocktails</h1>
        <div className='flex justify-between flex-row'>
            <p className='flex justify-start'>Here are some cocktails that suits for you.</p>
            <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={fetchCocktails} disabled={loading}>Refresh</button>
        </div>
        <div className='flex justify-center flex-row m-10'>
            { loading ? (<p>"Loading"</p>) : (cocktails.map(cocktail => (
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
            )))}
        </div>
        <div className='flex justify-center gap-5 flex-row mt-5'>
            <input className=' border border-lg h-10 rounded-lg' type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button className='bg-white text-black-100 border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded' onClick={handelSearch}>Search</button>
        </div>
        <div>
            {results.map(cocktail => (
                <ItemCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </div>
    </div>
  )
}
