import axios from 'axios';
const serverURL = "http://localhost:8000";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getHighClass = () => {
  return axios.get(`${serverURL}/high/info`)
}

const getUserInfo = () => {
  return axios.get(`${serverURL}/accounts/user/`);
}

const logout = () => {
  return axios.post(`${serverURL}/accounts/logout/`);
}


export {getUserInfo, logout, getHighClass};
