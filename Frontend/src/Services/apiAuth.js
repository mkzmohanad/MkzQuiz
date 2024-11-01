import axios from "axios";

export async function signUpApi(signUpData) {
    try{
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signup` , signUpData , {
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
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login` , loginData , {
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json',
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
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout` , {
            withCredentials: true
        })
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function updatePassword(newPassword) {
    try{
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/updatePassword` , newPassword , {
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