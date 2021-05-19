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
    </main>
  );
}

export default PastTrades;
