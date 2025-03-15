import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import img_bg from '../../assets/images/bg-sidebar.jpg';
 

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarBg, setSidebarBg] = useState(img_bg);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} sidebarBg={sidebarBg} />
            </div>
            <div className="admin-content">
                <FaBars className="admin-toggle" onClick={() => setCollapsed(!collapsed)} />
                content
            </div>
        </div>
    );
};

export default Admin;