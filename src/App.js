import React, { useEffect, useState  } from 'react';
import Recipe from './Recipe.js'
import './App.css';

const App = () => {
  const APP_ID = "7b00ca60";
  const APP_KEY = "c27f80d1ea0ffe7500f335b9a0278d25";
  //const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  //use state with hook
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect( () => {
    //console.log("Effect has been run...");
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${ query }&app_id=${ APP_ID }&app_key=${ APP_KEY }`
    );
    const data = await response.json();
    //console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value); 
    }

  const getSearch = (e) => {
    //to avoid make click event
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form onSubmit={ getSearch } className="search-form">
        <input className="search-bar" type="text" value={ search } onChange={ updateSearch } />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        { recipes.map( recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;
