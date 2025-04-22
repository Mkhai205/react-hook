import _ from 'lodash';
import { useState } from 'react';
import ModalViewImage from '../Admin/Content/Quiz/ModalViewImage';

const Question = (props) => {
    const { data, currentQuestion } = props;
    const [showImageModal, setShowImageModal] = useState(false);

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox = (event) => {
        const answerId = parseInt(event.target.value);
        props.handleAnswer(answerId);
    }

    const handleImageClick = () => {
        if (data.image) {
            setShowImageModal(true);
        }
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
                                <label key={index} className="answer">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion + 1}`}
                                        value={answer.id}
                                        onChange={(event) => handleCheckBox(event)}
                                        checked={answer.isSelected}
                                    />
                                    <span className="custom-radio"></span> {answer.description}
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