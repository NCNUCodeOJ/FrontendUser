import axios from 'axios';
const host = "https://precode.ptass.org";
const serverURL = host + "/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getAnnouncementList = () => {
  return axios.get(`${serverURL}/v1/announcements`)
};

export {
  getAnnouncementList
};
