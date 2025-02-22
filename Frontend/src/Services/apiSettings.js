import axios from "axios";

export async function getSettings() {
    try {
        const {data} = await axios.get(`https://mkzquiz-production.up.railway.app/api/v1/settings` , {
            withCredentials: true
        });

        return data;
    }
    catch(error) {
        throw new Error(error);
    }
}