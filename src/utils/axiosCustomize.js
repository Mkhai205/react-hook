import axios from 'axios';
import nProgress from 'nprogress';
import { store } from '../redux/store';
import { get } from 'lodash';

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});

instance.interceptors.request.use((config) => {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers['Authorization'] = `Bearer ${access_token}`;
    nProgress.start();
    // Do something before request is sent
    return config;
}, (error) => {
    nProgress.done();
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    nProgress.done();
    // any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return (response && response.data) ? response.data : response;
}, (error) => {
    nProgress.done();
    // any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return (error && error.response) ? error.response.data : Promise.reject(error);
});

export default instance;