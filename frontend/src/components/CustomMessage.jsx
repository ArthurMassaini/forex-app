import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

function CustomMessage({ children }) {
  return <Message>{children}</Message>;
}

CustomMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CustomMessage;
