import axios from "axios";
export const getAllUsers = () => axios.get("/users");
export const getAllBoards = () => axios.get("/boards");
export const getAllPins = () => axios.get("/pins");
export const getSinglePin = id => axios.get(`/pins/${id}`);
export const getBoardsForAuser = id => axios.get(`users/${id}/boards`);
