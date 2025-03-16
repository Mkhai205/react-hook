import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});

instance.interceptors.response.use((response) => {
    // any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return (response && response.data) ? response.data : response;
}, (error) => {
    // any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return (error && error.response) ? error.response.data : Promise.reject(error);
});

export default instance;