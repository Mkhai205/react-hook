import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';
import { useLocation } from "react-router-dom";
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    let questionDescription = null;
                    let image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    }

    const handleNext = () => {
        if (currentQuestion < dataQuiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const handleAnswer = (answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        dataQuizClone[currentQuestion].answers.forEach((answer) => {
            answer.isSelected = false;
            if (answer.id === answerId) {
                answer.isSelected = true;
            }
        });

        setDataQuiz(dataQuizClone);
    }

    const handleFinish = () => {
        alert('Finish');
    }

    return (
        <div className="detail-quiz-container container">
            <div className="left-container container">
                <div className="q-body">
                    <div className="q-title">
                        <h2>Quiz {quizId}: {location?.state?.quizTitle}</h2>
                    </div>
                    <hr />

                    <Question
                        handleAnswer={handleAnswer}
                        data={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
                        currentQuestion={currentQuestion}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                </div>

                <div className="footer d-flex justify-content-center">
                    <button
                        className="btn btn-primary mx-3"
                        onClick={handlePrev}
                    >Prev</button>
                    <button
                        className="btn btn-primary mx-3"
                        onClick={handleNext}
                    >Next</button>
                    {dataQuiz.length - 1 === currentQuestion &&
                        <button
                            className="btn btn-warning"
                            onClick={handleFinish}
                        >Finish</button>
                    }
                </div>
            </div>
            <div className="right-container container">
                clock
            </div>
        </div>
    )
}

export default DetailQuiz;