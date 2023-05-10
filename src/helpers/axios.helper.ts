import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import store from '../redux/store';

import { setLoader } from '../redux/loaderSlice';

export class AxiosHelper {
  private baseUrl: string = 'http://localhost:4000/api/';
  public client!: AxiosInstance;

  constructor() {
    this.configAxiosInstance();
  }

  private configAxiosInstance(): AxiosInstance {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
        Authorization: ''
      }
    };

    this.client = axios.create(config);
    store.dispatch(setLoader(true));
    this.client.interceptors.request.use(
      async function (config) {
        config.headers.Accept = 'application/json';
        return config;
      },
      function (error) {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log('Intercepting the response before sending it', response);
        setTimeout(() => {
          store.dispatch(setLoader(false));
        }, 800);

        return response;
      },
      (error) => {
        store.dispatch(setLoader(false));
        console.log('Response  Error: ', error);
        return Promise.reject((error && error?.response?.data?.errorMessage) || error?.response?.data?.message);
      }
    );
    return this.client;
  }

  public getClient() {
    return this.client;
  }
}
