import React, { useEffect, useState } from 'react';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((recipe, index) => (
            <li key={index}>{recipe.title}</li> 
          ))}
        </ul>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
}

export default Favorites;
