import * as STORAGE from './localStorage';

export async function fetchGetUser() {
  const { id } = STORAGE.getUser();
  const endpoint = `http://localhost:3001/users/${id}`;
  const response = await fetch(endpoint);
  const responseJson = await response.json();

  return responseJson;
}

export async function fetchLogin(email, password) {
  const endpoint = 'http://localhost:3001/login';

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();
    const { token } = responseJson;

    if (token) {
      STORAGE.setUser(responseJson);
      return { token };
    }
    return responseJson;
  } catch (error) {
    return error.message;
  }
}

export async function fetchRegister(name, email, password) {
  const endpoint = 'http://localhost:3001/users';

  const request = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return error.message;
  }
}

export async function fetchPostTrade(values, quantity, type) {
  const endpoint = 'http://localhost:3001/trades';

  const objectBody = {
    high: values.high,
    low: values.low,
    datetime: values.datetime,
    userId: STORAGE.getUser().id,
    quantity,
    type,
  };

  const request = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: STORAGE.getUser().token,
    },
    body: JSON.stringify(objectBody),
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return error.message;
  }
}

export async function fetchGetTrades() {
  const { id } = STORAGE.getUser();
  const endpoint = `http://localhost:3001/trades/${id}`;

  const request = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: STORAGE.getUser().token,
    },
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return error.message;
  }
}

export async function fetchUpdateTradeStatus(id, profritOrLoss) {
  const endpoint = `http://localhost:3001/trades/${id}`;

  const request = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: STORAGE.getUser().token,
    },
    body: JSON.stringify({ profritOrLoss, userId: STORAGE.getUser().id }),
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return error.message;
  }
}
