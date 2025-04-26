import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, username, password, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("username", username);
    data.append("password", password);
    data.append("role", role);
    data.append("userImage", image);

    return axios.post("api/v1/participant", data);
};

const putUpdateUser = async (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return axios.put("api/v1/participant", data);
};

const getAllUsers = async () => {
    return axios.get("api/v1/participant/all");
};

const deleteUser = async (userID) => {
    return axios.delete(`api/v1/participant`, { data: { id: userID } });
};

const getUserWithPaginate = async (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = async (email, password) => {
    return axios.post("api/v1/login", { email, password, delay: 3000 });
};

const postRegister = async (email, password, username) => {
    return axios.post("api/v1/register", { email, password, username });
};

const getQuizByUser = async () => {
    return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = async (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = async (data) => {
    return axios.post("api/v1/quiz-submit", data);
};

const postCreateNewQuiz = async (description, name, difficulty, image) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);

    return axios.post("api/v1/quiz", data);
};

const getAllQuizForAdmin = async () => {
    return axios.get("api/v1/quiz/all");
};

const putUpdateQuizForAdmin = async (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);

    return axios.put("api/v1/quiz", data);
};

const deleteQuizForAdmin = async (quizID) => {
    return axios.delete(`api/v1/quiz/${quizID}`);
};

const postCreateNewQuestionForQuiz = async (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", questionImage);

    return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = async (question_id, description, correct_answer) => {
    return axios.post("api/v1/answer", { description, correct_answer, question_id });
};

const postAssignQuizToUser = async (quizId, userId) => {
    return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = async (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = async (data) => {
    return axios.post("api/v1/quiz-upsert-qa", {...data});
};

const postLogout = async (email, refresh_token) => {
    return axios.post("api/v1/logout", { email, refresh_token });
}
const getDataOverview = async () => {
    return axios.get("api/v1/overview");
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuizToUser,
    getQuizWithQA,
    postUpsertQA,
    postLogout,
    getDataOverview,
};
