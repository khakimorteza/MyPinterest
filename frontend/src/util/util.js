import axios from "axios";
export const getAllUsers = () => axios.get("/users");
export const getSingleUser = id => axios.get(`/users/${id}`);
export const getAllBoards = () => axios.get("/boards");
export const getAllPins = () => axios.get("/pins");
export const getSinglePin = id => axios.get(`/pins/${id}`);
export const getBoardsAndPinsForAuser = id => axios.get(`/users/${id}/boards`);
export const getPinsForAuser = id => axios.get(`/users/${id}/pins`);
export const getABoardWithPins = id => axios.get(`/boards/${id}/pins`);
export const loginAuser = (username, password) =>
  axios.post("/users/login", { username, password });
export const signUpAuser = (username, email, password) =>
  axios.post("/users/", { username, email, password });
export const logoutUser = () => axios.post("users/logout");
export const isUserLoggedIn = () => axios.get("/users/isLoggedIn");
