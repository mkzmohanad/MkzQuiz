import axios from "axios"


export async function getAllUsers() {
    try {
        const {data} = await axios.get(`https://mkz-quiz-backend.vercel.app/api/v1/users/` , {
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
        await axios.delete(`https://mkz-quiz-backend.vercel.app/api/v1/users/${userId}` , {
            withCredentials : true,
        })
    }
    catch(error) {
        throw new Error(error)
    }
}