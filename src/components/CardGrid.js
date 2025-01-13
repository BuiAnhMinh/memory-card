import React from 'react';
import Card from './Card';
import './styles.css'

const CardGrid = ({ champions, onCardClick }) => {
  return (
    <div className="card-grid">
      {champions.map(champion => (
        <Card
          key={champion.id}
          id={champion.id}
          name={champion.name}
          image={champion.image}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default CardGrid;
