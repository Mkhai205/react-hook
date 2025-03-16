import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import img_bg from '../../assets/images/bg-sidebar.jpg';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, } from 'react-toastify';


const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarBg, setSidebarBg] = useState(img_bg);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} sidebarBg={sidebarBg} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars className="admin-toggle" onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>

            <ToastContainer
                position="top-center"
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
        </div>
    );
};

export default Admin;