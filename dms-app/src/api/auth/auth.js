import api from "../index";

export async function postLogin(username, password) {
  try {
    const request = { 
      SDT: username,
      MATKHAU: password
     };
    const response = await api.post('/dangnhap', request);
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