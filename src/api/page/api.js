import axios from 'axios';
const serverURL = "https://precode.ptass.org/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const logout = () => {
  return axios.post(`${serverURL}/accounts/logout/`);
}

const userLogin = (UserName, Password) => {
  return axios.post(`${serverURL}/v1/token`, {
    "UserName": UserName,
    "Password": Password,
  });
}

export {getUserInfo, logout, getHighClass, userLogin};
