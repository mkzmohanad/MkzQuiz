import axios from "axios";

export async function getSettings() {
    try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/v1/settings" , {
            withCredentials: true
        });

        return data;
    }
    catch(error) {
        throw new Error(error);
    }
}