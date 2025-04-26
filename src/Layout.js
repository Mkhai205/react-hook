import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";

const NotFound = () => {
    return (
        <div className="alert alert-danger container text-center mt-5">
            <h1>404 - Not Found!</h1>
        </div>
    );
};

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route
                    path="/admins"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;
