const ID_TOKEN = 'ID_TOKEN';
const ACCESS_TOKEN = 'ACCESS_TOKEN';
const USER_INFO = 'USER_INFO';

export function updateLoginInfo(user, id_token, access_token){
    localStorage.setItem(ID_TOKEN, id_token);
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(USER_INFO, JSON.stringify(user));
}

export function getIdToken() {
   return  localStorage.getItem(ID_TOKEN);
}

export function getUserInfo() {
   return JSON.parse(localStorage.getItem(USER_INFO));
}

export function isLogin(){
    return localStorage.getItem(ACCESS_TOKEN)!==null;
}

export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(USER_INFO);
}