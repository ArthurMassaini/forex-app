import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';

function Fluctuations({ values }) {
  const [valuesSell, setValuesSell] = useState('');
  const [valuesBuy, setValuesBuy] = useState('');
  const [compareSell, setCompareSell] = useState('');
  const [compareBuy, setCompareBuy] = useState('');

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

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          {verifyGreaterSell(values.low)}

          {/* <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group
          </Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <Button basic color="red">
            Sell
          </Button>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          {verifyGreaterBuy(values.high)}

          {/* <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group
          </Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          <Button basic color="green">
            Buy
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

Fluctuations.propTypes = {
  values: PropTypes.shape({
    high: PropTypes.string,
    low: PropTypes.string,
  }).isRequired,
};

export default Fluctuations;
