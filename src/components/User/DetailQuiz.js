import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";


const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        console.log("🚀 ~ DetailQuiz.js:27 ~ fetchQuestions ~ res", res);
    }

    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;