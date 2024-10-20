import React from 'react';
import { Link } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = ({ recommendations = [] }) => {
  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      <ol>
        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <li key={item.id} className="recommendation-item">
              <Link to={`/recipe/${item.id}`} className="recommendation-link">
                {item.title}
              </Link>
            </li>
          ))
        ) : (
          <p>No recipes found. Try searching with different ingredients.</p>
        )}
      </ol>
    </div>
  );
};

export default Recommendations;
