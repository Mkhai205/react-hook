import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";
import Question from "./Question";
import ModalResult from "./ModalResult";
import { toast } from "react-toastify";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizSubmitData, setQuizSubmitData] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
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
                    answers = _.orderBy(answers, ["id"], ["asc"]);
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handleNext = () => {
        if (currentQuestion < dataQuiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleQuestion = (index) => {
        setCurrentQuestion(index);
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswer = (answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        dataQuizClone[currentQuestion].answers.forEach((answer) => {
            answer.isSelected = false;
            if (answer.id === answerId) {
                answer.isSelected = true;
            }
        });

        setDataQuiz(dataQuizClone);
    };

    const handleFinish = async () => {
        let dataSubmit = {
            quizId: parseInt(quizId),
            answers: [],
        };

        dataQuiz.forEach((question) => {
            let answer = [];
            question.answers.forEach((item) => {
                if (item.isSelected) {
                    answer.push(item.id);
                }
            });
            dataSubmit.answers.push({
                questionId: parseInt(question.questionId),
                userAnswerId: answer,
            });
        });

        // call api submit quiz
        const res = await postSubmitQuiz(dataSubmit);

        console.log("🚀 ~ DetailQuiz.js:104 ~ handleFinish ~ res:", res);

        // redirect to result page
        if (res && res.EC === 0) {
            setDataModal({
                totalQuestion: res.DT.countTotal,
                correctAnswer: res.DT.countCorrect,
                quizData: res.DT.quizData,
            });
            setQuizSubmitData(res.DT.quizData);
            setShowResult(true);
            setIsSubmitted(true); // Mark quiz as submitted
        } else {
            toast.error("Submit quiz failed!");
        }
    };

    // Function to reset to first question
    const resetToFirstQuestion = () => {
        setCurrentQuestion(0);
    }

    return (
        <div className="detail-quiz-container container">
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/users">User</Breadcrumb.Item>
                    <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="quiz-content">
                <div className="left-container">
                    <div className="q-body">
                        <div className="q-title">
                            <h2>
                                Quiz {quizId}: {location?.state?.quizTitle}
                            </h2>
                        </div>
                        <hr />

                        <Question
                            handleAnswer={handleAnswer}
                            data={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
                            currentQuestion={currentQuestion}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            showAnswer={showAnswer}
                            quizSubmitData={quizSubmitData}
                        />
                    </div>

                    <div className="footer d-flex justify-content-center">
                        <button className="btn btn-primary mx-3" onClick={handlePrev}>
                            Prev
                        </button>
                        <button className="btn btn-primary mx-3" onClick={handleNext}>
                            Next
                        </button>
                        {dataQuiz.length - 1 === currentQuestion && !isSubmitted && (
                            <button
                                className="btn btn-warning"
                                onClick={handleFinish}
                            >
                                Finish
                            </button>
                        )}
                    </div>
                </div>
                <div className="right-container">
                    <RightContent
                        dataQuiz={dataQuiz}
                        currentQuestion={currentQuestion}
                        handleQuestion={handleQuestion}
                        handleFinish={handleFinish}
                        isSubmitted={isSubmitted}
                    />
                </div>
            </div>
            <ModalResult
                show={showResult}
                setShow={setShowResult}
                dataModal={dataModal}
                setShowAnswer={setShowAnswer}
                resetToFirstQuestion={resetToFirstQuestion}
            />
        </div>
    );
};

export default DetailQuiz;
