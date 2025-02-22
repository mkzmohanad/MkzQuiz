import axios from "axios";

export async function getSettings() {
    try {
        const {data} = await axios.get(`https://mkz-quiz-backend.vercel.app/api/v1/settings` , {
            withCredentials: "include"
        });

        return data;
    }
    catch(error) {
        throw new Error(error);
    }
}