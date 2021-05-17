export async function fetchToken() {
//   const requestTokenUrl = 'http://localhost:3001/login';
//   const request = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   };
//   try {
//     const response = await fetch(requestTokenUrl, request);
//     const responseJson = await response.json();
//     const { name, token, role, id } = responseJson;
//     const user = {
//       name,
//       email,
//       token,
//       role,
//       id,
//     };
//     if (token) {
//       setUser(user);
//       return token;
//     }
//     return responseJson.message;
//   } catch (error) {
//     return error.message;
//   }
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

    return responseJson.message;
  } catch (error) {
    return error.message;
  }
}
