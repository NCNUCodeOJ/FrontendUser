import axios from 'axios';
const host = "";
const serverURL = host + "/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const register = (StudentID, Email, UserName, RealName, Password, Avatar) => {
  return axios.post(`${serverURL}/v1/user`, {
    "username": UserName,
    "password": Password,
    "realname": RealName,
    "email": Email,
    "student_id": StudentID,
    "avatar": Avatar,
  })
};

export {
  register
};
