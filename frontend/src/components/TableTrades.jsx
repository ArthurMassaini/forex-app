import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Icon, Button } from 'semantic-ui-react';

import * as API from '../services/api';
import * as ACTIONS from '../redux/actions';

function TableTrades({ trades }) {
  const values = useSelector((state) => state.fluctuation.data[0]);
  const dispatch = useDispatch();

  const calculatePL = (type, high, low, quantity) => {
    let profitLoss;
    if (type === 'buy') {
      profitLoss = values.high * quantity - quantity * high;
      return profitLoss.toFixed(5);
    }
    profitLoss = low * quantity - quantity * values.low;
    return profitLoss.toFixed(5);
  };

  const handleClickStatus = async (id, type, high, low, quantity) => {
    const profritOrLoss = calculatePL(type, high, low, quantity);
    await API.fetchUpdateTradeStatus(id, profritOrLoss);
    dispatch(ACTIONS.flag());
  };

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Date</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Type</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Quantity/Position</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">
            Opening Position(buy/sell)
          </Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Status</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Profit/Loss</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {trades.map((trade) => {
          const { _id: id } = trade;
          return (
            <Table.Row key={id}>
              <Table.Cell>{trade.datetime}</Table.Cell>
              <Table.Cell>{trade.type}</Table.Cell>
              <Table.Cell textAlign="right">{trade.quantity}</Table.Cell>
              <Table.Cell textAlign="center">
                {trade.type === 'buy' ? trade.high : trade.low}
              </Table.Cell>
              <Table.Cell>
                {trade.status === 'open' ? (
                  <Icon color="green" name="checkmark" size="large" />
                ) : (
                  <Icon color="red" name="x" size="large" />
                )}
                {trade.status}
              </Table.Cell>
              <Table.Cell>{trade.profritOrLoss}</Table.Cell>
              <Table.Cell textAlign="center">
                {trade.status !== 'closed' && (
                  <Button
                    basic
                    color="red"
                    onClick={() => handleClickStatus(
                      id,
                      trade.type,
                      trade.high,
                      trade.low,
                      trade.quantity,
                    )}
                  >
                    Close Trade
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

TableTrades.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      high: PropTypes.string,
      low: PropTypes.string,
      datetime: PropTypes.string,
      quantity: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
};

export default TableTrades;
