import axios from "axios";

export async function getTopPlayers() {
    try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/v1/users/topUsers" , {
            withCredentials: true 
        });

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}