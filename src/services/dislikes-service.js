import axios from "axios";
/**
 * @file dislikes service interacts with session API and accesses the
 * dislikes RESTful web API
 */
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;
const api = axios.create({
    withCredentials: true
});

/**
 * returns all tuit items from the tuit collection that have been
 * disliked by a given user
 * @param {string} userId PK of the user
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the set of tuits
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

/**
 * returns all user items from the users collection that have
 * disliked a given tuit
 * @param {string} tid PK of the tuit
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the set of users
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

/**
 * sets the dislike status of a given tuit to 'disliked' or neutral
 * depending on the user's previous interactions with the same tuit
 * @param {string} uid PK of the user
 * @param {string} tid PK of the tuit
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the new dislike status of the tuit
 */
export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);
