import axios from 'axios';
const host = "https://precode.ptass.org";
const serverURL = host + "/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getCourseList = (userToken) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/class`, {transformResponse: [data => data]})
};

const getCourseInfo = (userToken, classID) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/class/${classID}`)
};

export {
  getCourseList, getCourseInfo
};
