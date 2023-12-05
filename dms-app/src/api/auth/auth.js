import api from "../index";

export async function postLogin(payload) {
  try {
    const request = { ...payload };
    const response = await api.post('/auth/login', request);
    return response;
  } catch(error) {
    console.log("Login failed", error.message);
  }
}

export async function postRegister(payload) {
  try {
    const request = { ...payload };
    const response = await api.post('auth/register', request);
    return response;
  } catch(error) {
    console.log("Register failed", error.message);
  }
}