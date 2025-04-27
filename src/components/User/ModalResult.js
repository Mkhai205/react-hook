import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, dataModal, setShowAnswer } = props;

    const handleClose = () => {
        setShow(false);
    }

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setShow(false);
        if (props.resetToFirstQuestion) {
            props.resetToFirstQuestion();
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop="static"
                centered
                className='modal-delete-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total question: {dataModal.totalQuestion}</div>
                    <div>Correct answer: {dataModal.correctAnswer}</div>
                    <div>Your score: {(dataModal.correctAnswer * 10 / dataModal.totalQuestion).toFixed(2)}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleShowAnswer}>
                        Show answer
                    </Button>
                    <Button variant="danger" onClick={handleClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;