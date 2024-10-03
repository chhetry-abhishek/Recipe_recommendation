import React from 'react';
import { Link } from 'react-router-dom';
import './Recommendations.css'; 

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((item) => (
          <li key={item.id} className="recommendation-item">
            <Link to={`/recipe/${item.id}`} className="recommendation-link">
              {item.name} {}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
