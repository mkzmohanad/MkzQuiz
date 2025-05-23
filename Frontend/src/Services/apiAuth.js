import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function signUpApi(signUpData) {
    try{
        const {data} = await axios.post(`${BACKEND_URL}/api/v1/users/signup` , signUpData , {
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function loginApi(loginData) { // for security return data without token (exclude the token)
    try {
        const {data} = await axios.post(`${BACKEND_URL}/api/v1/users/login` , loginData , {
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json',
                headers : {'Content-Type': 'application/json',}
            },
            
        })
        return data;
    }
    catch(error) {
        return error
    }
}

export async function logout() { 
    try{
        await axios.get(`${BACKEND_URL}/api/v1/users/logout` , {
            withCredentials: true
        })
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function updatePassword(newPassword) {
    try{
        const {data} = await axios.patch(`${BACKEND_URL}/api/v1/users/updatePassword` , newPassword , {
            withCredentials: true
        })

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function restrictedForAdmin() {
    try {
        await axios.patch("http://")
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function forgetPassword(userEmail) {
    try {
        const data = await axios.post(`${BACKEND_URL}/api/v1/users/forgetPassword` , userEmail , {
            withCredentials: true
        })

        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function resetPassword(userResetPassword , resetToken) {
    try {
        const data = await axios.patch(`${BACKEND_URL}/api/v1/users/resetPassword/${resetToken}` , userResetPassword , {
            withCredentials: true
        })

        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}