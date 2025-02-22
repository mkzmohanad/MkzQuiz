import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllUsers() {
    try {
        const {data} = await axios.get(`${BACKEND_URL}/api/v1/users/` , {
            withCredentials : true,
            headers : {'Content-Type': 'application/json',}
        })

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function deleteUser(userId) {
    try{
        await axios.delete(`${BACKEND_URL}/api/v1/users/${userId}` , {
            withCredentials : true,
        })
    }
    catch(error) {
        throw new Error(error)
    }
}