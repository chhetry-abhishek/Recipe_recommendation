import React, { useState, useEffect } from 'react';
import Recommendations from '../components/Recommendations';
import FavoriteRecipes from '../components/FavoriteRecipes'; // New Component
import './Home.css'; // Ensure you import the CSS

function Home() {
  const [ingredients, setIngredients] = useState(['']);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const query = ingredients.filter((ingredient) => ingredient.trim() !== '').join(',');

    if (!query) {
      alert("Please enter at least one ingredient.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&number=5&apiKey=f17956d73ddc47ea8d47e000143ff4a2`
      );
      const data = await response.json();
      setRecipes(data.results || []); // Handle empty results gracefully
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }

    setLoading(false);
  };

  // Fetch random popular recipes for "People's Favorites"
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=5&apiKey=f17956d73ddc47ea8d47e000143ff4a2`
        );
        const data = await response.json();
        setFavorites(data.recipes || []); // Handle empty results gracefully
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    };

    fetchPopularRecipes();
  }, []);

  return (
    <div className="home">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch} className="recipe-finder-form">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input-group">
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="ingredient-input"
            />
            <button
              type="button"
              className="remove-ingredient-button"
              onClick={() => handleRemoveIngredient(index)}
              disabled={ingredients.length === 1} // Disable if there's only one ingredient
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient} className="add-ingredient-button">
          Add Another Ingredient
        </button>
        <button type="submit" className="search-recipes-button">Search Recipes</button>
      </form>

      {loading ? (
        <p className="loading-message">Loading recipes...</p>
      ) : (
        <Recommendations recommendations={recipes} />
      )}

      {/* New Section for People's Favorites */}
      <FavoriteRecipes favorites={favorites} />
    </div>
  );
}

export default Home;
