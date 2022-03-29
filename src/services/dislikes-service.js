import axios from "axios";

const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
// KA heroku: // const BASE_URL = "https://kalmeida-cs5500.herokuapp.com/"
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;


/**
 * dislikes service interacts with session API and accesses the
 * dislikes RESTful web API
 * @property {axios}
 */
const api = axios.create({
    withCredentials: true
});

export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);
