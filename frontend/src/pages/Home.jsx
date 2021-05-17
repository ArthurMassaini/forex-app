import React from 'react';
import { Redirect } from 'react-router-dom';

import * as STORAGE from '../services/localStorage';

function Home() {
  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return <main>Home</main>;
}

export default Home;
