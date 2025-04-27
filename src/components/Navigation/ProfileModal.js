import { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { getHistoryQuiz, postChangePassword, postUpdateProfile } from "../../services/apiService";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import "./ProfileModal.scss";

const ProfileModal = (props) => {
    const { showModal, setShowModal, dataUser } = props;

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [historyQuiz, setHistoryQuiz] = useState([]);

    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email);
            setUsername(dataUser.username);
            setRole(dataUser.role);
            if (dataUser.image) {
                setPreviewImage(`data:image/png;base64,${dataUser.image}`);
            }
        }
    }, [dataUser]);

    // Format date in "HH:MM:SS A DD:MM:YYYY" format
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid date
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        
        return `${hours}:${minutes}:${seconds} ${ampm} ${day}:${month}:${year}`;
    };

    // User information
    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleSubmitUpdateUser = async () => {
        // validate data
        if (!username) {
            toast.error("Username is required");
            return;
        }

        // call api
        const data = await postUpdateProfile(username, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    // Change password
    const handleChangePassword = async () => {
        // validate data
        if (!currentPassword) {
            toast.warning("Current password is required");
            return;
        }
        if (!newPassword) {
            toast.warning("New password is required");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.warning("Confirm password is not match with new password");
            return;
        }

        // call api
        try {
            const res = await postChangePassword(currentPassword, newPassword);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("An error occurred while changing the password.");
        }
    };

    // Get history quiz
    const getHistoryListQuiz = async () => {
        try {
            const res = await getHistoryQuiz();

            if (res && res.EC === 0) {
                setHistoryQuiz(res.DT.data);
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            console.error("Error fetching history quiz:", error);
            toast.error("An error occurred while fetching the history quiz.");
        }
    };

    useEffect(() => {
        if (showModal) {
            getHistoryListQuiz();
        }
    }, [showModal]);

    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            backdrop="static"
            className="modal-show-user"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="user-information"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="user-information" title="User Information">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder="abc@gmail.com"
                                    required
                                    disabled={true}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(event) => setRole(event.target.value)}
                                    disabled={true}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label label-upload" htmlFor="upload-file">
                                    <FcPlus />
                                    Upload File Image
                                </label>
                                <input
                                    type="file"
                                    id="upload-file"
                                    hidden
                                    onChange={(event) => handleUpLoadImage(event)}
                                />
                            </div>
                            <div className="col-md-12 img-preview">
                                {previewImage ? (
                                    <img src={previewImage} alt="preview" />
                                ) : (
                                    <span>Preview Image</span>
                                )}
                            </div>
                        </form>
                        <Button variant="warning" onClick={() => handleSubmitUpdateUser()}>
                            Update
                        </Button>
                    </Tab>
                    <Tab eventKey="change-password" title="Change Password">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                            </div>
                        </form>
                        <Button variant="warning" onClick={() => handleChangePassword()}>
                            Change Password
                        </Button>
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Quiz Name</th>
                                        <th scope="col">Total Question</th>
                                        <th scope="col">Total Correct</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyQuiz?.map((quiz, index) => (
                                        <tr key={`history-quiz-${quiz.id}`}>
                                            <th>{quiz.id}</th>
                                            <td>{quiz.quizHistory.name}</td>
                                            <td>{quiz.total_questions}</td>
                                            <td>{quiz.total_correct}</td>
                                            <td>{formatDate(quiz.createdAt)}</td>
                                        </tr>
                                    ))}
                                    {historyQuiz.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
