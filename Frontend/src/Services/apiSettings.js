import axios from "axios";

export async function getSettings() {
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/settings` , {
            withCredentials: true
        });

        return data;
    }
    catch(error) {
        throw new Error(error);
    }
}