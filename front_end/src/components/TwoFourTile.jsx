import React from 'react';
import "../App.css";

const TwoFourTile = ({ value }) => {
  return (
    <div className={`tile tile-${value}`}>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default TwoFourTile;
