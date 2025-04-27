import { Modal, Button, Image, Badge, Card, ListGroup } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoShieldSharp } from "react-icons/io5";

const ModalShowUser = (props) => {
    const { show, setShow, dataShow, setDataShowUser } = props;

    const handleClose = () => {
        setShow(false);
        setDataShowUser({});
    };

    // Get the first letter of the username for the avatar fallback
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className='modal-show-user'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center mb-3">
                        {dataShow.image ? (
                            <Image
                                src={`data:image/png;base64,${dataShow.image}`}
                                roundedCircle
                                width={240}
                                height={240}

                                className="mb-3 object-fit-cover"
                                
                                alt={`${dataShow.username}'s profile`}
                            />
                        ) : (
                            <div
                                className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white"
                                style={{ width: "200px", height: "200px", fontSize: "10rem" }}
                            >
                                {getInitials(dataShow.username)}
                            </div>
                        )}
                    </div>

                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="d-flex align-items-center">
                                    <FaUserAlt className="me-2 text-secondary" />
                                    <div>
                                        <div className="fw-bold">Username</div>
                                        <div>{dataShow.username}</div>
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-flex align-items-center">
                                    <MdEmail className="me-2 text-secondary" />
                                    <div>
                                        <div className="fw-bold">Email</div>
                                        <div>{dataShow.email}</div>
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-flex align-items-center">
                                    <IoShieldSharp className="me-2 text-secondary" />
                                    <div>
                                        <div className="fw-bold">Role</div>
                                        <Badge bg="primary" className="mt-1">
                                            {dataShow.role}
                                        </Badge>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalShowUser;