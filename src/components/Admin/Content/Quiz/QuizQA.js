"use client";

import { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Badge, Alert, Pagination } from "react-bootstrap";
import { FaUpload, FaTimes, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
import {
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
} from "../../../../services/apiService";

// Sample quiz data - replace with your actual data source
// const SAMPLE_QUIZZES = [
//     { id: "1", title: "Mathematics Quiz" },
//     { id: "2", title: "Science Quiz" },
//     { id: "3", title: "History Quiz" },
//     { id: "4", title: "Geography Quiz" },
// ]

// Empty question template
const EMPTY_QUESTION = {
    question: "",
    image: null,
    answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ],
};

const QuizQA = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [questions, setQuestions] = useState([{ ...EMPTY_QUESTION }]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            const newQuiz = res.DT.map((item) => {
                return { id: item.id, title: `${item.id} - ${item.description}` };
            });
            setListQuiz(newQuiz);
        } else {
            toast.error(res.EM);
        }
    };

    // Get current question
    const currentQuestion = questions[currentQuestionIndex];

    // Handle question text change
    const handleQuestionChange = (value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            question: value,
        };
        setQuestions(updatedQuestions);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        if (e && e.target && e.target.files && e.target.files[0]) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex] = {
                ...updatedQuestions[currentQuestionIndex],
                image: e.target.files[0],
            };
            setQuestions(updatedQuestions);
        }
    };

    // Remove image
    const removeImage = () => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            image: null,
        };
        setQuestions(updatedQuestions);
    };

    // Handle answer text change
    const handleAnswerChange = (index, text) => {
        const updatedQuestions = [...questions];
        const updatedAnswers = [...updatedQuestions[currentQuestionIndex].answers];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            text,
        };
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            answers: updatedAnswers,
        };
        setQuestions(updatedQuestions);
    };

    // Handle correct answer change
    const handleCorrectChange = (index, checked) => {
        const updatedQuestions = [...questions];
        const updatedAnswers = [...updatedQuestions[currentQuestionIndex].answers];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            isCorrect: checked,
        };
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            answers: updatedAnswers,
        };
        setQuestions(updatedQuestions);
    };

    // Add answer option
    const addAnswerOption = () => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            answers: [
                ...updatedQuestions[currentQuestionIndex].answers,
                { text: "", isCorrect: false },
            ],
        };
        setQuestions(updatedQuestions);
    };

    // Remove answer option
    const removeAnswerOption = (index) => {
        if (questions[currentQuestionIndex].answers.length > 2) {
            const updatedQuestions = [...questions];
            const updatedAnswers = [...updatedQuestions[currentQuestionIndex].answers];
            updatedAnswers.splice(index, 1);
            updatedQuestions[currentQuestionIndex] = {
                ...updatedQuestions[currentQuestionIndex],
                answers: updatedAnswers,
            };
            setQuestions(updatedQuestions);
        }
    };

    // Add new question
    const addNewQuestion = () => {
        // Validate current question before adding a new one
        if (!validateCurrentQuestion()) {
            return;
        }

        setQuestions([...questions, { ...EMPTY_QUESTION }]);
        setCurrentQuestionIndex(questions.length);

        setSuccessMessage("Question saved! Now add another one.");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        toast.success("Question saved! Now add another one.");
    };

    // Remove current question
    const removeCurrentQuestion = () => {
        if (questions.length <= 1) {
            alert("You must have at least one question.");
            return;
        }

        const updatedQuestions = [...questions];
        updatedQuestions.splice(currentQuestionIndex, 1);
        setQuestions(updatedQuestions);

        // Adjust current index if needed
        if (currentQuestionIndex >= updatedQuestions.length) {
            setCurrentQuestionIndex(updatedQuestions.length - 1);
        }
    };

    // Navigate to previous question
    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Navigate to next question
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Go to specific question
    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    };

    // Validate current question
    const validateCurrentQuestion = () => {
        if (!selectedQuiz) {
            toast.warning("Please select a quiz");
            return false;
        }

        if (!currentQuestion.question.trim()) {
            toast.warning("Please enter a question");
            return false;
        }

        if (currentQuestion.answers.filter((a) => a.text.trim()).length < 2) {
            toast.warning("Please provide at least two answer options");
            return false;
        }

        if (!currentQuestion.answers.some((a) => a.isCorrect)) {
            toast.warning("Please mark at least one answer as correct");
            return false;
        }

        return true;
    };

    // Save all questions
    const saveAllQuestions = async () => {
        // Validate current question
        if (!validateCurrentQuestion()) {
            return;
        }

        // Call API to save all questions
        //

        for (const question of questions) {
            const resQuestion = await postCreateNewQuestionForQuiz(
                selectedQuiz,
                question.question,
                question.image
            );
            if (resQuestion && resQuestion.EC === 0) {
                for (const answer of question.answers) {
                    const resAnswer = await postCreateNewAnswerForQuestion(
                        resQuestion.DT.id,
                        answer.text,
                        answer.isCorrect
                    );
                    if (resAnswer && resAnswer.EC !== 0) {
                        toast.error(resAnswer.EM);
                        return;
                    }
                }
            } else {
                toast.error(resQuestion.EM);
                return;
            }
        }

        setSuccessMessage("All questions saved successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        toast.success("Questions saved successfully");
    };

    // Get selected quiz name
    // const getSelectedQuizName = () => {
    //     const quiz = SAMPLE_QUIZZES.find((q) => q.id === selectedQuiz)
    //     return quiz ? quiz.title : ""
    // }

    // Generate pagination items
    const paginationItems = [];
    for (let i = 0; i < questions.length; i++) {
        paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === currentQuestionIndex}
                onClick={() => goToQuestion(i)}
            >
                {i + 1}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <Card className="mx-auto mb-4" style={{ maxWidth: "1000px" }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title>Update Questions to Quiz</Card.Title>
                    <Badge bg="primary" className="fs-6">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                </Card.Header>
                <Card.Body>
                    {/* Quiz Selection */}
                    <Form.Group className="mb-4">
                        <Form.Label>
                            <b>Select Quiz</b>
                        </Form.Label>
                        <Form.Select
                            value={selectedQuiz}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                        >
                            <option value="">Select a quiz</option>
                            {listQuiz.map((quiz) => (
                                <option key={quiz.id} value={quiz.id}>
                                    {quiz.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {showSuccess && (
                        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                            {successMessage}
                        </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between mb-4">
                        <Button
                            variant="primary"
                            onClick={addNewQuestion}
                            className="d-flex align-items-center gap-2"
                        >
                            <FaPlus /> Add New Question
                        </Button>

                        <Button
                            variant="success"
                            onClick={saveAllQuestions}
                            className="d-flex align-items-center gap-2"
                        >
                            <FaSave /> Save All Questions
                        </Button>
                    </div>

                    {/* Current Question Form */}
                    <Card className="mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Question {currentQuestionIndex + 1}</h5>
                            {questions.length > 1 && (
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={removeCurrentQuestion}
                                    className="d-flex align-items-center gap-1"
                                >
                                    <FaTrash size={12} /> Remove
                                </Button>
                            )}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {/* Left Column: Question */}
                                <Col md={8}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter your question here"
                                            value={currentQuestion.question}
                                            onChange={(e) => handleQuestionChange(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Right Column: Image Upload */}
                                <Col md={4}>
                                    <Form.Group className="d-flex flex-column justify-content-center align-items-center mb-4">
                                        <Form.Label>Upload Image</Form.Label>
                                        <div className="d-flex justify-content-center mb-3">
                                            {!currentQuestion.image ? (
                                                <div
                                                    className="d-flex flex-column justify-content-center align-items-center border border-2 border-dashed rounded p-3"
                                                    style={{
                                                        width: "200px",
                                                        height: "200px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        document
                                                            .getElementById("image-upload")
                                                            .click()
                                                    }
                                                >
                                                    <FaUpload
                                                        size={32}
                                                        className="text-muted mb-2"
                                                    />
                                                    <span className="text-muted">Upload Image</span>
                                                    <Form.Control
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="d-none"
                                                        onChange={handleImageUpload}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="position-relative"
                                                    style={{ width: "200px", height: "200px" }}
                                                >
                                                    <img
                                                        src={
                                                            URL.createObjectURL(
                                                                currentQuestion.image
                                                            ) || "/placeholder.svg"
                                                        }
                                                        alt="Question img preview"
                                                        className="img-fluid rounded"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="d-flex align-items-center position-absolute"
                                                        style={{
                                                            top: "-10px",
                                                            right: "-10px",
                                                            borderRadius: "50%",
                                                            padding: "0.5rem 0.5rem",
                                                        }}
                                                        onClick={removeImage}
                                                    >
                                                        <FaTimes size={12} />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Answer Options - Full Width */}
                            <Row>
                                <Col xs={12}>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <Form.Label className="mb-0">Answer Options</Form.Label>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={addAnswerOption}
                                                className="d-flex align-items-center"
                                            >
                                                <FaPlus className="me-1" size={12} /> Add Option
                                            </Button>
                                        </div>

                                        {currentQuestion.answers.map((answer, index) => (
                                            <div
                                                key={index}
                                                className="d-flex align-items-start mb-2 gap-2"
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`correct-${index}`}
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleCorrectChange(index, e.target.checked)
                                                    }
                                                    className="mt-2"
                                                    label=""
                                                />
                                                <Form.Control
                                                    placeholder={`Answer option ${index + 1}`}
                                                    value={answer.text}
                                                    onChange={(e) =>
                                                        handleAnswerChange(index, e.target.value)
                                                    }
                                                    className="flex-grow-1"
                                                />
                                                {currentQuestion.answers.length > 2 && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => removeAnswerOption(index)}
                                                        style={{
                                                            borderRadius: "50%",
                                                            padding: "0.5rem 0.5rem",
                                                            marginTop: "0.25rem",
                                                        }}
                                                        className="d-flex align-items-center p-2"
                                                    >
                                                        <FaTimes size={14} />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* Question Navigation */}
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev
                                onClick={goToPreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            />
                            {paginationItems}
                            <Pagination.Next
                                onClick={goToNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                            />
                        </Pagination>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuizQA;
