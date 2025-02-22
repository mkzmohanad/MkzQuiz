import axios from "axios"


export async function getAllUsers() {
    try {
        const {data} = await axios.get(`https://mkz-quiz-backend.vercel.app/v1/users/` , {
            withCredentials : "include",
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
        await axios.delete(`https://mkz-quiz-backend.vercel.app/v1/users/${userId}` , {
            withCredentials : "include",
        })
    }
    catch(error) {
        throw new Error(error)
    }
}