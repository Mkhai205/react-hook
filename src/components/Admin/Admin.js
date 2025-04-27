import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import img_bg from "../../assets/images/bg-sidebar.jpg";
import { Outlet } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Language from "../Navigation/Language";
import { postLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarBg, setSidebarBg] = useState(img_bg);

    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await postLogout(account.email, account.access_token);

        if (res && res.EC === 0) {
            // clear data redux
            dispatch(doLogout());
            // clear data local storage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            localStorage.removeItem("persist:root");
            toast.success("Logout success!");
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} sidebarBg={sidebarBg} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars className="admin-toggle" onClick={() => setCollapsed(!collapsed)} />
                    <div className="admin-header-right">

                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
