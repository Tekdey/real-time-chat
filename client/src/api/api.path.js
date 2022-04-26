const host = "http://localhost:5000";
// Auth
export const registerRoute = `${host}/auth/register`;
export const loginRoute = `${host}/auth/login`;
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
