import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import TableTrades from '../components/TableTrades';
import * as STORAGE from '../services/localStorage';
import * as API from '../services/api';

function PastTrades() {
  const [trades, getTrades] = useState([]);

  useEffect(() => {
    API.fetchGetTrades().then((response) => getTrades(response));
  }, []);

  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="main-home">
      <NavBar item="PastTrades" />

      <section className="section-table">
        <TableTrades trades={trades} />
      </section>
    </main>
  );
}

export default PastTrades;
