import axios from "axios"


export async function getAllUsers() {
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/` , {
            withCredentials : true,
        })

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function deleteUser(userId) {
    try{
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}` , {
            withCredentials : true,
        })
    }
    catch(error) {
        throw new Error(error)
    }
}