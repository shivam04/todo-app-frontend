import axios from 'axios';
import AuthConstant from '../Constant/AuthConstant';

export function clearSession(nav, setIsActive) {
    request(
        'GET',
        '/api/auth/logout'
    ).then(res => {
        setAuthHeader(null);
        setIsActive(false);
        nav("/");
    }).catch(err => {
        console.log(err);
    });
}

export function isLoggedIn() {
    return (getAuthToken() !== null && getAuthToken() !== "null");
}

export const getAuthToken = () => {
    return window.localStorage.getItem(AuthConstant.AUTH_TOKEN);
}

export const setAuthHeader = (res) => {
    const data = res?.data || {};
    window.localStorage.setItem(AuthConstant.AUTH_TOKEN, data?.jwtToken || null);
    window.localStorage.setItem(AuthConstant.AUTH_USER_DATA, data?.userResponseDTO?.userName || null);
};

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    console.log(method, url, data);
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};