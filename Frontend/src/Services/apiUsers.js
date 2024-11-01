import axios from "axios";

export async function getMe() {
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/getMe` , {
            withCredentials: true 
        });
        const {data : userRank} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/getCurrentUserRank` , {
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
        const {data} =await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/updateMe` , newData  , {
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
        const {data} =await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/resetMe`, {} , {
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
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/deleteMe`, password , {
            withCredentials: true,
        })
        return data;
    }
    catch(error) {
        throw new Error(error)
    }
}