import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllQuestions() {
    try {
        const {data} = await axios.get(`${BACKEND_URL}/api/v1/questions` , {
            withCredentials : true,
        })

        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function userStartedGame(isStartedGame) {
    try {
        const {data} = await axios.patch(`${BACKEND_URL}/api/v1/users/updateMe`, isStartedGame , {
            withCredentials: true,
        })
        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function userCompletedGame(isCompletedGame) {
    try {
        const {data} = await axios.patch(`${BACKEND_URL}/api/v1/users/updateMe`, isCompletedGame , {
            withCredentials: true,
        })
        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function updateUserResults(newResults) {
    try{
        const {data} = await axios.patch(`${BACKEND_URL}/api/v1/users/updateMe`, newResults , {
            withCredentials: true,
        })

        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function deleteSingleQuestion(questionToDelete) {
    try{
        const {data} = await axios.delete(`${BACKEND_URL}/api/v1/questions/${questionToDelete}` , {
            withCredentials: true,
        })

        return data
    }
    catch(err) {
        throw new Error(err)
    }
}

export async function deleteAllQuestions() {
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/questions` , {
            withCredentials : true,
        })

    }
    catch(error) {
        throw new Error(error);
    }
} 

export async function createNewQuestion(question) {
    try{
        const {data} = await axios.post(`${BACKEND_URL}/api/v1/questions` , question , {
            withCredentials : true,
        })

        return data
    }
    catch(error) {
        throw new Error(error.response.data.error.message)
    }
}

export async function editQuestion(questionToEdit) {
    const {id , finalData} = questionToEdit;

    try{
        const {data} = await axios.patch(`${BACKEND_URL}/api/v1/questions/${id}` , finalData , {
            withCredentials : true
        })
        return data
    }
    catch(error) {
        throw new Error(error)
    }
}