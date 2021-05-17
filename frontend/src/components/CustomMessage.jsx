import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

function CustomMessage({ children, type }) {
  if (type === 'positive') {
    return <Message positive>{children}</Message>;
  }
}

CustomMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CustomMessage;
