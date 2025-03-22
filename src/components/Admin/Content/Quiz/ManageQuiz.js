import './ManageQuiz.scss';
import Select from 'react-select';
import { useState, useRef } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({ value: 'EASY', label: 'EASY' });
    const [image, setImage] = useState('');
    const fileInputRef = useRef(null);

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const handleUploadImage = (event) => {
        if (event?.target?.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const setDefault = () => {
        setName('');
        setDescription('');
        setType({ value: 'EASY', label: 'EASY' });
        setImage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmitQuiz = async () => {
        // validate
        if (!name || !description || !type) {
            toast.error('Please fill all fields');
            return;
        }

        // call api
        const res = await postCreateNewQuiz(description, name, type?.value, image);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            setDefault();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="manage-quiz-container">
            <div className="manage-quiz-header">
                <h1 className="title">Manage Quizzes</h1>
            </div>

            <hr />

            <div className="add-new">
                <fieldset className='border rounded-3 p-3'>
                    <legend className='float-none w-auto px-3 mb-1'>Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="your quiz name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <Select
                            value={type}
                            options={options}
                            placeholder='Quiz type...'
                            onChange={setType}
                        />
                    </div>
                    <div className='more-actions'>
                        <input
                            type='file'
                            className='form-control'
                            onChange={(event) => handleUploadImage(event)}
                            ref={fileInputRef}
                        />
                    </div>
                    <div
                        className='btn btn-primary mt-3'
                        onClick={() => handleSubmitQuiz()}
                    >Save</div>
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz;