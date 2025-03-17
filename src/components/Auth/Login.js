import './Login.scss'
import { useState } from 'react';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        //validate



        // call api
        const data = await postLogin(email, password);
        if (data && parseInt(data.EC) === 0) {      
            toast.success(data.EM);
            navigate('/');
        } else if (data && parseInt(data.EC) !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div
            className='login-container'
        >
            <div className='header'>
                <span>Don't have an account?</span>
                <button
                    className='btn btn-primary'
                >Sign up</button>
            </div>
            <div className='btn btn-primary go-back' onClick={() => navigate('/')}>
                <TiArrowBack fontSize={'24px'} /> Go back home
            </div>
            <div className='title col-4'>
                <h1>Kaka quizz</h1>
            </div>
            <div className='welcome col-4'>
                <h5>Hello, who's this?</h5>
            </div>
            <div className='form-content col-4'>
                <div className='form-group'>
                    <label htmlFor='email' >Email</label>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' >Password</label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className='forget-password'>Forgot password?</p>
                <button
                    className='btn btn-primary'
                    onClick={() => handleLogin()}
                >Log in to KaKa Quizz</button>
            </div>
        </div>
    )
}

export default Login;