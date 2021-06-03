import axios from 'axios';
import authToken from '../utils/authToken';

const token = authToken.getToken();

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_DEV_BASE_URL;

export const instance = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
  headers: {
    'x-auth-token': token,
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

const successResponse = (response) => response.data;

const failResponse = (error) => Promise.reject(error);

const Request = (options) => instance(options).then(successResponse).catch(failResponse);

export default Request;
