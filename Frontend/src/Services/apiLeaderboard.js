import axios from "axios";

export async function getTopPlayers() {
    try {
        const {data} = await axios.get(`https://mkzquiz-production.up.railway.app/api/v1/users/topUsers` , {
            withCredentials: true 
        });

        return data
    }
    catch(error) {
        throw new Error(error)
    }
}