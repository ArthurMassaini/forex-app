import React from 'react';
import PropTypes from 'prop-types';

function Fluctuations({ values }) {
  return (
    <section>
      <h1>{values.high}</h1>
      <h2>{values.low}</h2>
    </section>
  );
}

Fluctuations.propTypes = {
  values: PropTypes.shape({
    high: PropTypes.string,
    low: PropTypes.string,
  }).isRequired,
};

export default Fluctuations;
