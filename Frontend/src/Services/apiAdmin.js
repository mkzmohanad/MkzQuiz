import axios from "axios"


export async function getAllUsers() {
    try {
        const {data} = await axios.get(`https://mkzquiz-production.up.railway.app/api/v1/users/` , {
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
        await axios.delete(`https://mkzquiz-production.up.railway.app/api/v1/users/${userId}` , {
            withCredentials : true,
        })
    }
    catch(error) {
        throw new Error(error)
    }
}