import React from 'react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import * as STORAGE from '../services/localStorage';

function PastTrades() {
  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <NavBar item="PastTrades" />

      <h3 className="no-margin">
        50000,00
      </h3>
      <p>Available to trade</p>
    </main>
  );
}

export default PastTrades;
