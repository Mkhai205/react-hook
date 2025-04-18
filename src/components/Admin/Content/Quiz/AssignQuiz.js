import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers } from "../../../../services/apiService";
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
                return { id: item.id, title: `${item.id} - ${item.description}` };
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
                return { id: item.id, title: `${item.id} - ${item.username} - ${item.email}` };
            });
            setListUser(newUser);
        } else {
            toast.error(res.EM);
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
                            {listQuiz.map((quiz) => (
                                <option key={quiz.id} value={quiz.id}>
                                    {quiz.title}
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
                            {listUser.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary px-4">Assign</button>
                </div>
            </Form>
        </div>
    );
};

export default AssignQuiz;
