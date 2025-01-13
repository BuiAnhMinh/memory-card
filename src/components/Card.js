import React from 'react';


const Card = ({ id, name, image, onClick, flipped }) => {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={() => onClick(id)}
    >
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
