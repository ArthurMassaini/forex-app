import React from 'react';
import { useSelector } from 'react-redux';

function SpreadValue() {
  const values = useSelector((state) => state.fluctuation.data[0]);

  if (values) {
    return (
      <h3>
        {`Spread: ${Math.round(
          (Number(values.high) - Number(values.low)) * 100000,
        )}`}
      </h3>
    );
  }

  return <h1>Loading...</h1>;
}

export default SpreadValue;
