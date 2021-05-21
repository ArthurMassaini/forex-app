import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../components/NavBar';
import TableTrades from '../components/TableTrades';
import * as STORAGE from '../utils/localStorage';
import * as API from '../utils/api';

function PastTrades() {
  const [trades, getTrades] = useState([]);
  const flag = useSelector((state) => state.flag.payload);

  useEffect(() => {
    API.fetchGetTrades().then((response) => getTrades(response));
  }, [flag]);

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
