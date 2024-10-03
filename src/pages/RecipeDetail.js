// src/pages/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css'; 

const RecipeDetail = () => {
  const { recipeId } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=f17956d73ddc47ea8d47e000143ff4a2`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
      setLoading(false);
    };

    fetchRecipeDetail();
  }, [recipeId]);

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <table className="recipe-table">
        <thead>
          <tr>
            <th>Ingredients</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </td>
            <td>
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecipeDetail;
