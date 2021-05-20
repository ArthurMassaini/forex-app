import React, { useState } from 'react';
import { Card, Button, Input } from 'semantic-ui-react';

import ExchangeValueSell from './fluctuationsValues/ExchangeValueSell';
import ExchangeValueBuy from './fluctuationsValues/ExchangeValueBuy';
import SpreadValue from './fluctuationsValues/SpreadValue';
// import * as API from '../services/api';

function Fluctuations() {
  const [colorGreen, setColorGreen] = useState();
  const [colorRed, setColorRed] = useState();
  const [color, setColor] = useState();
  const [input, setInput] = useState({ quantity: '' });

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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInput({ ...input, [name]: value });
  };

  const handleTradeClick = async () => {
    // await API.fetchPostTrade(values);
  };

  return (
    <div>
      <SpreadValue />

      <Card.Group>
        <Card>
          <Card.Content>
            <ExchangeValueSell />
          </Card.Content>
          <Card.Content extra>
            <Button color={colorRed} onClick={handleClick} name="red">
              Sell
            </Button>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <ExchangeValueBuy />
          </Card.Content>
          <Card.Content extra>
            <Button color={colorGreen} onClick={handleClick} name="green">
              Buy
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
      <br />

      <Input
        placeholder="Quantity"
        type="number"
        className="input-trade"
        name="quantity"
        value={input.quantity}
        onChange={handleChange}
      />
      <br />

      <Button color={color} name={color} onClick={handleTradeClick}>
        Place trade
      </Button>
    </div>
  );
}

export default Fluctuations;
