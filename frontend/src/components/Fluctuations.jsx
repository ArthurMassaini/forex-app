import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Input } from 'semantic-ui-react';

function Fluctuations({ values }) {
  const [valuesSell, setValuesSell] = useState('');
  const [valuesBuy, setValuesBuy] = useState('');
  const [compareSell, setCompareSell] = useState('');
  const [compareBuy, setCompareBuy] = useState('');
  const [colorGreen, setColorGreen] = useState();
  const [colorRed, setColorRed] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    setCompareSell(valuesSell);
    setCompareBuy(valuesBuy);
    setValuesSell(values.low);
    setValuesBuy(values.high);
  }, [values]);

  const verifyGreaterSell = (newValue) => {
    if (Number(newValue) > Number(compareSell)) {
      return (
        <Card.Header>
          <p className="green">
            {newValue}
            ↑
          </p>
        </Card.Header>
      );
    }
    return (
      <Card.Header>
        <p className="red">
          {newValue}
          ↓
        </p>
      </Card.Header>
    );
  };

  const verifyGreaterBuy = (newValue) => {
    if (Number(newValue) > Number(compareBuy)) {
      return (
        <Card.Header>
          <p className="green">
            {newValue}
            ↑
          </p>
        </Card.Header>
      );
    }
    return (
      <Card.Header>
        <p className="red">
          {newValue}
          ↓
        </p>
      </Card.Header>
    );
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    setColor(name);
    if (name === 'red') {
      setColorRed(name);
      setColorGreen();
    } else {
      setColorGreen(name);
      setColorRed();
    }
  };

  return (
    <div>
      <h3>
        {`Spread: ${
          Math.round((Number(values.high) - Number(values.low)) * 100000)
        }`}
      </h3>
      <Card.Group>
        <Card>
          <Card.Content>{verifyGreaterSell(values.low)}</Card.Content>
          <Card.Content extra>
            <Button color={colorRed} onClick={handleClick} name="red">
              Sell
            </Button>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>{verifyGreaterBuy(values.high)}</Card.Content>
          <Card.Content extra>
            <Button color={colorGreen} onClick={handleClick} name="green">
              Buy
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
      <br />
      <Input placeholder="Quantity" className="input-trade" />
      <br />
      <Button color={color} name={color}>
        Place trade
      </Button>
    </div>
  );
}

Fluctuations.propTypes = {
  values: PropTypes.shape({
    high: PropTypes.string,
    low: PropTypes.string,
  }).isRequired,
};

export default Fluctuations;
