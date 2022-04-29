const host = "http://localhost:5000";
// Auth
export const signupRoute = `${host}/auth/signup`;
export const loginRoute = `${host}/auth/login`;
// Token
export const tokenRoute = `${host}/token`;
export const accessRoute = `${host}/token/access`;
// Account
export const updatePasswordRoute = `${host}/account/update/password`;
export const updateAccountRoute = `${host}/account/update`;
export const deleteAccountRoute = `${host}/account/delete`;
// Rooms
export const createRoomRoute = `${host}/room/create`;
export const joinRoomRoute = `${host}/room/join`;
export const getAllRoomRoute = `${host}/room/all`;
export const getRoomNameRoute = `${host}/room/name`;

export const END_POINT = `http://localhost:5000`;
