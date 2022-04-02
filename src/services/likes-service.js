/**
 * @file likes service interacts with session API and accesses the
 * likes RESTful web API
 * @property {axios}
 */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;
const api = axios.create({
  withCredentials: true
});

/**
 * returns all tuit items from the tuits collection that have been
 * liked by a given user
 * @param {string} userId PK of the user
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the set of tuits
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * returns all user items from the users collection that have liked
 * a given tuit
 * @param {sring} tid PK of the tuit
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the set of users
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * sets the like status of a given tuit to 'liked' or neutral depending
 * on the user's previous interactions with the same tuit
 * @param {string} uid PK of the user
 * @param {string} tid PK of the tuit
 * @returns {Promise<AxiosResponse<any>>} promise for a response
 * containing the new like status of the tuit
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);