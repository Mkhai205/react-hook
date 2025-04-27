// import { useState } from 'react';
import './Questions.scss';
import AddQuestionForm from './AddQuestionForm';

const Questions = (props) => {

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>

            <hr />

            <div className="add-new-question">
                <AddQuestionForm />
            </div>
        </div>
    )

}

export default Questions;