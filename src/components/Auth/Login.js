import './Login.scss'
import { useState } from 'react';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // Validate input fields
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email');
            return;
        }

        try {
            // Call API
            const data = await postLogin(email, password);
            if (data && parseInt(data.EC) === 0) {
                dispatch(doLogin(data.DT));
                navigate('/');
                toast.success(data.EM);
            } else if (data && parseInt(data.EC) !== 0) {
                toast.error(data.EM);
            }
        } catch (error) {
            toast.error('An error occurred while logging in. Please try again.');
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account?</span>
                <button
                    className='btn sign-up'
                    onClick={() => navigate('/register')}
                >Sign up</button>
            </div>
            <div className='btn btn-light go-back' onClick={() => navigate('/')}>
                <TiArrowBack fontSize={'24px'} /> Go back home
            </div>
            <div className='title col-4'>
                <h1>Kaka quizz</h1>
            </div>
            <div className='welcome col-4'>
                <h5>Hello, who's this?</h5>
            </div>
            <div className='form-content col-4'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <p className='forget-password'>Forgot password?</p>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={handleLogin}
                    >Log in to KaKa Quizz</button>
                </form>
            </div>
        </div>
    )
}

export default Login;