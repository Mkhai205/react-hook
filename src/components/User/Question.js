import _ from 'lodash';

const Question = (props) => {
    const { data, currentQuestion } = props;

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox = (event) => {
        const answerId = parseInt(event.target.value);
        props.handleAnswer(answerId);
    }

    return (
        <>
            {data.image ? 
            <img src={`data:image/jpg;base64, ${data.image}`} alt="quiz-img" className="q-image" />
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
        </>
    )
}

export default Question;