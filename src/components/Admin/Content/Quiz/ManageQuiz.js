import './ManageQuiz.scss';
import Select from 'react-select';
import { useState, useRef, useEffect } from 'react';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({ value: 'EASY', label: 'EASY' });
    const [image, setImage] = useState('');
    const fileInputRef = useRef(null);
    const [listQuiz, setListQuiz] = useState([]);
    const [dataSelectedQuiz, setDataSelectedQuiz] = useState({});
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [activeKey, setActiveKey] = useState('0');

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

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
            setActiveKey('1'); // Switch to the List Quizzes tab
            fetchListQuiz(); // Refresh the list of quizzes
        } else {
            toast.error(res.EM);
        }
    }

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataSelectedQuiz(quiz);
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataSelectedQuiz(quiz);
    }

    return (
        <div className="manage-quiz-container">
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
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
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>List Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="list-detail">
                            <TableQuiz
                                listQuiz={listQuiz}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                handleClickBtnDelete={handleClickBtnDelete}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataSelectedQuiz}
                setDataUpdate={setDataSelectedQuiz}
                fetchListQuiz={fetchListQuiz}
            />

            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataSelectedQuiz}
                setDataDelete={setDataSelectedQuiz}
                fetchListQuiz={fetchListQuiz}
            />
        </div>
    )
}

export default ManageQuiz;