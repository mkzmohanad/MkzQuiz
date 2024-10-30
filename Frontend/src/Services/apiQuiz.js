import axios from "axios";

export async function getAllQuestions() {
    try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/v1/questions" , {
            withCredentials : true,
        })

        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function userStartedGame(isStartedGame) {
    console.log("starting-ending")
    try {
        const {data} = await axios.patch("http://127.0.0.1:8000/api/v1/users/updateMe", isStartedGame , {
            withCredentials: true,
        })
        console.log(data)
        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function userCompletedGame(isCompletedGame) {
    console.log("starting-ending")
    try {
        const {data} = await axios.patch("http://127.0.0.1:8000/api/v1/users/updateMe", isCompletedGame , {
            withCredentials: true,
        })
        console.log(data)
        return data
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function updateUserResults(newResults) {
    try{
        const {data} = await axios.patch("http://127.0.0.1:8000/api/v1/users/updateMe", newResults , {
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
        const {data} = await axios.delete(`http://127.0.0.1:8000/api/v1/questions/${questionToDelete}` , {
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
        await axios.delete(`http://127.0.0.1:8000/api/v1/questions` , {
            withCredentials : true,
        })

    }
    catch(error) {
        console.log(error)
        throw new Error(error);
    }
} 

export async function createNewQuestion(question) {
    try{
        const {data} = await axios.post(`http://127.0.0.1:8000/api/v1/questions` , question , {
            withCredentials : true,
        })

        return data
    }
    catch(error) {
        console.log(error)
        throw new Error(error.response.data.error.message)
    }
}

export async function editQuestion(questionToEdit) {

    const {id , finalData} = questionToEdit;
    console.log(questionToEdit)
    console.log(id)
    console.log(finalData)

    try{
        const {data} = await axios.patch(`http://127.0.0.1:8000/api/v1/questions/${id}` , finalData , {
            withCredentials : true
        })
        return data
    }
    catch(error) {
        throw new Error(error)
    }
}