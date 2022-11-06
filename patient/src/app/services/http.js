import axios from 'axios';
import serializeError from 'serialize-error';
import {get} from 'lodash';

import {Config} from '@common';
import {Platform} from 'react-native';

axios.defaults.baseURL = 'http://localhost:4000';

if (Platform.OS === 'android') {
  axios.defaults.baseURL = 'http://10.0.2.2:4000';
}

axios.defaults.timeout = 30000;
axios.defaults.headers.mobile = true;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message = serializeError(error);
    return Promise.reject(get(message, 'response.data.message', error));
  },
);

const http = {
  // setAuthorizationHeader(accessToken) {
  //   axios.defaults.headers.Authorization = `${accessToken}`;
  // },
  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  },
};

export default http;
