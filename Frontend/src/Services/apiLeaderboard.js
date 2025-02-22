import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getTopPlayers() {
    try {
        const {data} = await axios.get(`${BACKEND_URL}/api/v1/users/topUsers` , {
            withCredentials: true 
        });

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}