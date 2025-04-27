import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalViewImage.scss';

const ModalViewImage = (props) => {
    const { show, setShow, imageUrl } = props;


    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop="static"
                centered
                className='modal-view-image'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Question Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="image-container">
                    {imageUrl && 
                        <img 
                            src={imageUrl}
                            alt="question" 
                            className="full-size-image"
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewImage;