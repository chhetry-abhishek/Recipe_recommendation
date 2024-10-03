import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=f17956d73ddc47ea8d47e000143ff4a2`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(searchTerm);
  };

  return (
    <div>
      <h1>Recipe Recommendations</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <table className="recipe-table">
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                  </td>
                  <td>
                    {}
                    <Link to={`/recipe/${recipe.id}`}>
                      <button>View Recipe</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No recipes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
