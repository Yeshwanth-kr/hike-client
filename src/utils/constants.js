export const HOST = "https://hike-server.onrender.com";

export const AUTH_ROUTE = `${HOST}/api/auth`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/userinfo`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/updateprofile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/updateprofileimage`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/removeprofileimage`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

export const CONTACTS_ROUTE = `${HOST}/api/contacts`;
export const SEARCH_CONTACT_ROUTE = `${CONTACTS_ROUTE}/search`;
export const GET_DM_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/getcontactsfordm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/getallcontacts`;

export const MESSAGES_ROUTE = `${HOST}/api/messages`;
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/getMessages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTE}/uploadfile`;

export const CHANNEL_ROUTE = `${HOST}/api/channel`;
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/createchannel`;
export const GET_USER_CHANNELS_ROUTE = `${CHANNEL_ROUTE}/getuserchannels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNEL_ROUTE}/getchannelmessages`;
