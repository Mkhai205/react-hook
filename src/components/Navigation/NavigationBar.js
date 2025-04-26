import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";

const NavigationBar = (props) => {
    const account = useSelector((state) => state.user.account);

    // console.log("🚀 ~ NavigationBar.js:13 ~ NavigationBar ~ account:", account);

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

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
            // navigate to home page
            navigate("/login");
            toast.success("Logout success!");
        } else {
            toast.error(res.EM);
        }

    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="app-logo" />
                    KaKa quizz
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                            User
                        </NavLink>
                        <NavLink className="nav-link" to="/admins">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button className="btn-login" onClick={() => handleLogin()}>
                                    Log in
                                </button>
                                <button className="btn-signup" onClick={() => handleRegister()}>
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
