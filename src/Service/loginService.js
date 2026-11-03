import authAxious from "../Config/interceptor";


export const API_URL_LOGIN = '/login/CreateLogin';
// http://127.0.0.1:8000/login/CreateLogin

const loginuser = async (user) => {
    console.log('user', user)
    const response = await authAxious.post(API_URL_LOGIN, user);
    return response.data;
};


const loginService = {
    loginuser,
};
export default loginService;