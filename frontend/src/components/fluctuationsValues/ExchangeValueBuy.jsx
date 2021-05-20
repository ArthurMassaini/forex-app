import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';

function ExchangeValueBuy() {
  const [valuesBuy, setValuesBuy] = useState('');

  const [compareBuy, setCompareBuy] = useState('');
  const values = useSelector((state) => state.fluctuation.data[0]);

  useEffect(() => {
    setCompareBuy(valuesBuy);
    if (values) {
      setValuesBuy(values.high);
    }
  }, [values]);

  if (values) {
    if (Number(values.high) > Number(compareBuy)) {
      return (
        <Card.Header>
          <p className="green">
            {values.high}
            ↑
          </p>
        </Card.Header>
      );
    }
    return (
      <Card.Header>
        <p className="red">
          {values.high}
          ↓
        </p>
      </Card.Header>
    );
  }

  return <h1>Loading...</h1>;
}

export default ExchangeValueBuy;
