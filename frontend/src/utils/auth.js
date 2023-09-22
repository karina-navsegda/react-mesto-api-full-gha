/* const BASE_URL = "https://auth.nomoreparties.co"; */
export const baseUrl = "http://localhost:3000";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

function login(data) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

 function register(data) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
} 

/* function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  }).then(res => checkResponse(res));
}  */

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { register, login, checkToken };
