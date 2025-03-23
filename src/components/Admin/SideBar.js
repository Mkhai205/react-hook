import 'react-pro-sidebar/dist/css/styles.css';
import './SideBar.scss';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGem, FaGithub, } from 'react-icons/fa';
import { SiReactivex } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SideBar = (props) => {
    const { sidebarBg, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        <SiReactivex className='app-logo' />
                        <span> Kaka quizz</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to='/admins' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title='Features'
                        >
                            <MenuItem>
                                Quản lý Users
                                <Link to='/admins/manage-user' />
                            </MenuItem>
                            <MenuItem>
                                Quản lý bài Quiz
                                <Link to='/admins/manage-quizzes' />
                            </MenuItem>
                            <MenuItem>
                                Quản lý câu hỏi
                                <Link to='/admins/manage-questions' />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/Mkhai205/react-hook"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                MKhai205
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )

}

export default SideBar;