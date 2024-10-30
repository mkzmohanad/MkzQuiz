import axios from "axios";

export async function getMe() {
    try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/v1/users/getMe" , {
            withCredentials: true 
        });
        const {data : userRank} = await axios.get("http://127.0.0.1:8000/api/v1/users/getCurrentUserRank" , {
            withCredentials: true 
        });
        return {data , isAuthenticated : true , userRank};
    }
    catch(error) {
        return {data : null , error , isAuthenticated : false};
    }
}

export async function updateUserDate(newData) {
    try {
        const {data} =await axios.patch("http://127.0.0.1:8000/api/v1/users/updateMe" , newData  , {
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
        const {data} =await axios.patch("http://127.0.0.1:8000/api/v1/users/resetMe", {} , {
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
        const {data} = await axios.patch("http://127.0.0.1:8000/api/v1/users/deleteMe", password , {
            withCredentials: true,
        })
        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}