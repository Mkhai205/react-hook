import { useState, useEffect } from "react";
import {
    getAllQuizForAdmin,
    getAllUsers,
    postAssignQuizToUser,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, []);

    const fetchListQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            const newQuiz = res.DT.map((item) => {
                return { value: item.id, label: `${item.id} - ${item.name}` };
            });
            setListQuiz(newQuiz);
        } else {
            toast.error(res.EM);
        }
    };

    const fetchListUser = async () => {
        const res = await getAllUsers();
        if (res && res.EC === 0) {
            const newUser = res.DT.map((item) => {
                return { value: item.id, label: `${item.id} - ${item.username} - ${item.email}` };
            });
            setListUser(newUser);
        } else {
            toast.error(res.EM);
        }
    };

    const handleAssign = async () => {
        if (!selectedQuiz || !selectedUser) {
            toast.error("Please select both a quiz and a user.");
            return;
        }

        const res = await postAssignQuizToUser(selectedQuiz, selectedUser);

        // Add feedback based on the response
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz('');
            setSelectedUser('');
        } else {
            toast.error(res.EM || "Failed to assign quiz.");
        }
    };

    return (
        <div className="assign-quiz-container">
            <Form>
                <div className="row">
                    <Form.Group className="mb-4 col-md-6">
                        <Form.Label>
                            <b>Select Quiz</b>
                        </Form.Label>
                        <Form.Select
                            value={selectedQuiz}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                        >
                            <option value="">Select a quiz</option>
                            {listQuiz?.map((quiz) => (
                                <option key={quiz.value} value={quiz.value}>
                                    {quiz.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4 col-md-6">
                        <Form.Label>
                            <b>Select User</b>
                        </Form.Label>
                        <Form.Select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {listUser?.map((user) => (
                                <option key={user.value} value={user.value}>
                                    {user.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-primary px-4" onClick={handleAssign}>
                        Assign
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default AssignQuiz;
