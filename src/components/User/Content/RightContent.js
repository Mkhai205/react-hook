import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz, currentQuestion, isSubmitted } = props;

    // console.log("🚀 ~ RightContent.js:6 ~ RightContent ~ data:", dataQuiz);

    const onTimeUp = () => {
        props.handleFinish();
    }

    const getClassQuestion = (index, question) => {
        if (currentQuestion === index) {
            return "question isSelected";
        }
        if (question && question.answers.length > 0) {
            let isUnAnswer = question.answers.some((item) => item.isSelected);
            if( isUnAnswer === true) {
                return "question answered";
            }
        }

        return "question";
    }

    return (
        <>
            <div className="main-timer">
                <CountDown 
                    onTimeUp={onTimeUp}
                    isSubmitted={isSubmitted}
                />
            </div>

            <div className="main-question">
                {dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={getClassQuestion(index, item)}
                                onClick={() => props.handleQuestion(index)}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default RightContent;
