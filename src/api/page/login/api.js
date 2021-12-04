import axios from 'axios';
const serverURL = "https://precode.ptass.org/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const userLogin = (UserName, Password) => {
  return axios.post(`${serverURL}/v1/token`, {
    "UserName": UserName,
    "Password": Password
  });
}

const refreshToken = (userToken) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`/v1/token`);
}

const getUserInfo = (userToken) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/user`);
}

const logout = () => {
  return axios.post(`${serverURL}/accounts/logout/`);
}

export { getUserInfo, logout, userLogin, refreshToken };
