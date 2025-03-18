import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, } from 'react-toastify';
import App from './App';
import { Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='/users' element={<User />} />
                </Route>

                <Route path='/admins' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
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
    )
}

export default Layout;