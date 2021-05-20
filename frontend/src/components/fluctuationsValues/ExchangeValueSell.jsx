import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';

function ExchangeValueSell() {
  const [valuesSell, setValuesSell] = useState('');
  const [compareSell, setCompareSell] = useState('');
  const values = useSelector((state) => state.fluctuation.data[0]);

  useEffect(() => {
    setCompareSell(valuesSell);

    if (values) {
      setValuesSell(values.low);
    }
  }, [values]);

  if (values) {
    if (Number(values.low) > Number(compareSell)) {
      return (
        <Card.Header>
          <p className="green">
            {values.low}
            ↑
          </p>
        </Card.Header>
      );
    }
    return (
      <Card.Header>
        <p className="red">
          {values.low}
          ↓
        </p>
      </Card.Header>
    );
  }

  return <h1>Loading...</h1>;
}

export default ExchangeValueSell;
