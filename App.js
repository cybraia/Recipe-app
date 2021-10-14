import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './recipe';

const App = () => {
  const API_ID = "567b1ce2" ;
  const API_KEY = "ca07fe9c927545d385d4d2b66ef46afc"; 

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chocolate");

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async() => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
      <input className = "search-bar" type="text" value={search} onChange = {updateSearch}/>
      <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipess">
      {recipes.map(recipe =>
        (<Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
        ))}
        </div>
    </div>
  )
}

export default App;
