import axios from "axios"

export async function getAllUsers() {
    try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/v1/users/" , {
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
        await axios.delete(`http://127.0.0.1:8000/api/v1/users/${userId}` , {
            withCredentials : true,
        })
    }
    catch(error) {
        throw new Error(error)
    }
}