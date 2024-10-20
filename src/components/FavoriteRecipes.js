import React, { useRef } from 'react';
import './FavoriteRecipes.css';

const FavoriteRecipes = ({ favorites = [] }) => {
  const favoritesRef = useRef();
  const totalCards = favorites.length; 

  const scrollLeft = () => {
    if (favoritesRef.current) {
      const scrollWidth = favoritesRef.current.scrollWidth; 
      const clientWidth = favoritesRef.current.clientWidth;
      const scrollLeft = favoritesRef.current.scrollLeft; 

      if (scrollLeft === 0) {
        favoritesRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        favoritesRef.current.scrollBy({ left: -200, behavior: 'smooth' }); 
      }
    }
  };

  const scrollRight = () => {
    if (favoritesRef.current) {
      const scrollWidth = favoritesRef.current.scrollWidth;
      const clientWidth = favoritesRef.current.clientWidth; 
      const scrollLeft = favoritesRef.current.scrollLeft; 

      if (scrollLeft + clientWidth >= scrollWidth) {
        favoritesRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        favoritesRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="favorites-container">
      <h2>People's Favorites</h2>
      <div className="carousel-controls">
        <button className="carousel-button" onClick={scrollLeft}>&lt;</button>
        <div className="favorite-recipes" ref={favoritesRef}>
          {totalCards > 0 ? (
            favorites.map((recipe) => (
              <div key={recipe.id} className="favorite-card">
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '5px' }} />
              </div>
            ))
          ) : (
            <p>No favorite recipes found.</p>
          )}
        </div>
        <button className="carousel-button" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
