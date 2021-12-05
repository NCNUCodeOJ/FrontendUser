import axios from 'axios';
const serverURL = "https://precode.ptass.org/api";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getUserInfo = (userToken) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.get(`/v1/user`);
};

const updateUserInfo = (userToken, StudentID, Email, RealName, Password, Avatar) => {
  const authAxios = axios.create({
    baseURL: serverURL,
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  })
  return authAxios.patch(`v1/user`, {
    "realname": RealName,
    "email": Email,
    "password": Password,
    "student_id": StudentID,
    "avatar": Avatar
  })
}

export {
  getUserInfo, updateUserInfo
};
