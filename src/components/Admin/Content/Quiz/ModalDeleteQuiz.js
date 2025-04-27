import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { useEffect, useState } from 'react';


const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmitDeleteQuiz = async () => {
        // call api
        const data = await deleteQuizForAdmin(dataDelete.id);

        if (data && data.EC === 0) {
            props.fetchListQuiz();
            toast.success(data.EM);
            handleClose();
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className='modal-delete-quiz'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Do you want delete this quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataDelete.name}
                                placeholder='abc@gmail.com'
                                disabled={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={dataDelete.difficulty}
                                disabled={true}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={dataDelete.description}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {`data:image/png;base64,${dataDelete.image}` ?
                                <img src={`data:image/png;base64,${dataDelete.image}`} alt="preview" />
                                : <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleSubmitDeleteQuiz()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;