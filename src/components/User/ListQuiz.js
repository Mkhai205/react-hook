import { use } from "react";
import { useState, useEffect } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss';

const ListQuiz = (props) => {
    const [arrayQuiz, setArrayQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const response = await getQuizByUser();

        console.log("🚀 ~ ListQuiz.js:15 ~ getQuizData ~ response:", response);


        if (response && response.EC === 0) {
            setArrayQuiz(response.DT);
        }
    }

    return (
        <div className="list-quiz-container container">
            {arrayQuiz && arrayQuiz.length > 0 && arrayQuiz.map((quiz, index) => {
                return (
                    <div className="card" style={{ width: "18rem" }} key={`quiz-${index}`}>
                        <img
                            className="card-img-top"
                            src={`data:image/jpeg;base64, ${quiz.image}`}
                            alt="Card cap" />
                        <div className="card-body">
                            <h5 className="card-title">Quiz {index + 1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button className="btn btn-primary">Start now</button>
                        </div>
                    </div>
                )
            })}

            {arrayQuiz && arrayQuiz.length === 0 && <h1>No quiz available</h1>}
        </div>
    )
}

export default ListQuiz;