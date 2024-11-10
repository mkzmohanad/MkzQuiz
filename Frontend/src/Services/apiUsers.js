import axios from "axios";

export async function getMe() {
    try {
        const {data} = await axios.get(`https://mkz-quiz-backend.vercel.app/api/v1/users/getMe` , {
            withCredentials: true ,
            headers : {'Content-Type': 'application/json',}
        });
        const {data : userRank} = await axios.get(`https://mkz-quiz-backend.vercel.app/api/v1/users/getCurrentUserRank` , {
            withCredentials: true ,
            headers : {'Content-Type': 'application/json',}
        });
        return {data , isAuthenticated : true , userRank};
    }
    catch(error) {
        return {data : null , error , isAuthenticated : false};
    }
}

export async function updateUserDate(newData) {
    try {
        const {data} =await axios.patch(`https://mkz-quiz-backend.vercel.app/api/v1/users/updateMe` , newData  , {
            withCredentials: true
        })
        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function resetMe() {
    try {
        const {data} =await axios.patch(`https://mkz-quiz-backend.vercel.app/api/v1/users/resetMe`, {} , {
            withCredentials: true
        })
        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}

export async function deleteMe(password) {
    try {
        const {data} = await axios.patch(`https://mkz-quiz-backend.vercel.app/api/v1/users/deleteMe`, password , {
            withCredentials: true,
        })
        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}