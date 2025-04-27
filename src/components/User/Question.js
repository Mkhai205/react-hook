import _ from 'lodash';
import { useState } from 'react';
import ModalViewImage from '../Admin/Content/Quiz/ModalViewImage';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Question = (props) => {
    const { data, currentQuestion, showAnswer, quizSubmitData } = props;
    const [showImageModal, setShowImageModal] = useState(false);

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox = (event) => {
        if (showAnswer) return; // Prevent changing answers when showing answers
        const answerId = parseInt(event.target.value);
        props.handleAnswer(answerId);
    }

    const handleImageClick = () => {
        if (data.image) {
            setShowImageModal(true);
        }
    }

    // Find current question data in the quiz submit data
    const findQuestionResult = () => {
        if (!showAnswer || !quizSubmitData) return null;
        
        return quizSubmitData.find(item => 
            parseInt(item.questionId) === parseInt(data.questionId)
        );
    }

    // Determine if an answer is correct
    const isCorrectAnswer = (answerId) => {
        const questionResult = findQuestionResult();
        if (!questionResult) return false;
        
        return questionResult.systemAnswers.some(answer => 
            answer.id === answerId && answer.correct_answer === true
        );
    }

    // Determine if user selected this answer
    const isUserSelected = (answerId) => {
        const questionResult = findQuestionResult();
        if (!questionResult) return false;
        
        return questionResult.userAnswers.includes(answerId);
    }

    return (
        <>
            {data.image ? 
            <img 
                src={`data:image/jpg;base64, ${data.image}`} 
                alt="quiz-img" 
                className="q-image" 
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
            />
            :
            <div className='q-image'></div>
            }

            <div className="q-content">
                <p><b>Question {currentQuestion + 1}:</b> {data.questionDescription}?</p>
                <div className="answers">
                    <form>
                        {data.answers && data.answers.length && data.answers.map((answer, index) => {
                            return (
                                <label key={index} className={`answer ${showAnswer ? (isCorrectAnswer(answer.id) ? 'correct-answer' : '') : ''}`}>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion + 1}`}
                                        value={answer.id}
                                        onChange={(event) => handleCheckBox(event)}
                                        checked={answer.isSelected}
                                        disabled={showAnswer}
                                    />
                                    <span className="custom-radio"></span> {answer.description}
                                    
                                    {showAnswer && (
                                        <span className="answer-result">
                                            {isCorrectAnswer(answer.id) ? 
                                                <FaCheck className="correct-icon" /> : 
                                                (isUserSelected(answer.id) ? <FaTimes className="incorrect-icon" /> : null)
                                            }
                                        </span>
                                    )}
                                </label>
                            )
                        })}
                    </form>
                </div>
            </div>

            <ModalViewImage 
                show={showImageModal}
                setShow={setShowImageModal}
                imageUrl={`data:image/jpg;base64, ${data.image}`}
            />
        </>
    )
}

export default Question;