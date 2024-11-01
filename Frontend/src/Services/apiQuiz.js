import axios from "axios";

export async function getAllQuestions() {
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/questions` , {
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
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/updateMe`, isStartedGame , {
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
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/updateMe`, isCompletedGame , {
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
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/updateMe`, newResults , {
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
        const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/questions/${questionToDelete}` , {
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
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/questions` , {
            withCredentials : true,
        })

    }
    catch(error) {
        throw new Error(error);
    }
} 

export async function createNewQuestion(question) {
    try{
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/questions` , question , {
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
        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/questions/${id}` , finalData , {
            withCredentials : true
        })
        return data
    }
    catch(error) {
        throw new Error(error)
    }
}