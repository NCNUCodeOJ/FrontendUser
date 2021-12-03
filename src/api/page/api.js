import axios from 'axios';
const serverURL = "https://precode.ptass.org/api/v1";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const logout = () => {
  return axios.post(`${serverURL}/accounts/logout/`);
}

export {logout};
