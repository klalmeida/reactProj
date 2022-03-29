import axios from "axios";

const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
// KA heroku: // const BASE_URL = "https://kalmeida-cs5500.herokuapp.com/"
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * likes service interacts with session API and accesses the
 * likes RESTful web API
 * @property {axios}
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);