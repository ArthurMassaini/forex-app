import * as STORAGE from './localStorage';

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

export async function fetchTrade(values) {
  const endpoint = 'http://localhost:3001/trades';

  const request = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: STORAGE.getUser().token,
    },
    body: JSON.stringify(values),
  };

  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return error.message;
  }
}
