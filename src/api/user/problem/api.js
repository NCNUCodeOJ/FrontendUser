import axios from 'axios';
const host = "";
const serverURL = host + "/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getHomeWorkList = (userToken, classID) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/class/${classID}/problem`, { transformResponse: [data => data] })
};

const getHomeWorkInfo = (userToken, classID, problemID) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/class/${classID}/problem/${problemID}`)
};

const createHomeWork = (userToken, classID, problemID, submissionData) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.post(`${serverURL}/v1/class/${classID}/problem/${problemID}/submission`, submissionData,{ transformResponse: [data => data] })
};

const getHomeWorkSubmission = (userToken, classID, problemID,submissionID) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`${serverURL}/v1/class/${classID}/problem/${problemID}/submission/${submissionID}`, { transformResponse: [data => data] })
};
export {
  getHomeWorkList, getHomeWorkInfo, createHomeWork, getHomeWorkSubmission
};
