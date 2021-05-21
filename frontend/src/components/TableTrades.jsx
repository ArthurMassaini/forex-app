import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button } from 'semantic-ui-react';

import * as API from '../services/api';

function TableTrades({ trades }) {
  const handleClickStatus = async (id) => {
    await API.fetchUpdateTradeStatus(id);
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
              <Table.Cell textAlign="center">
                {trade.status !== 'closed' && (
                  <Button
                    basic
                    color="red"
                    onClick={() => handleClickStatus(id)}
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
  trades: PropTypes.arrayOf().isRequired,
};

export default TableTrades;
