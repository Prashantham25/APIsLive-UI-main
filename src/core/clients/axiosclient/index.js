import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;

const loginUserToken = localStorage.getItem("token");
axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization:
    loginUserToken === "" || loginUserToken === null || loginUserToken === undefined
      ? process.env.REACT_APP_API_KEY
      : `Bearer ${loginUserToken}`,
};

export function setAuthorizationIfUserLoggedIn() {
  const existingToken = localStorage.getItem("token");

  if (existingToken !== "") {
    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${existingToken}`,
    };
  }
}

// All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 90000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function putRequest(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return axiosClient.delete(`/${URL}`).then((response) => response);
}

export function postRequestNoApi(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL_NOAPI;
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}
export function putRequestNoApi(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL_NOAPI;
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function getRequestNoApi(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL_NOAPI;
  return axiosClient.get(`/${URL}`, payload).then((response) => response);
}

export function deleteRequestNoApi(URL, payload) {
  axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL_NOAPI;
  return axiosClient.delete(`/${URL}`, payload).then((response) => response);
}
