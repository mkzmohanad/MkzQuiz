import axios from "axios";

export async function getTopPlayers() {
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/topUsers` , {
            withCredentials: true 
        });

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}