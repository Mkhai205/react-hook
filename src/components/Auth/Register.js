import './Register.scss'
import { useState } from 'react';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Language from '../Navigation/Language';

const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        //validate
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email');
            return;
        }

        // call api
        const data = await postRegister(email, password, username);
        if (data && parseInt(data.EC) === 0) {
            toast.success(data.EM);
            navigate('/login');
        } else if (data && parseInt(data.EC) !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className='register-container'>
            <div className='header'>
                <span>Don't have an account?</span>
                <button
                    className='btn login'
                    onClick={() => navigate('/login')}
                >Log in</button>
                <Language />
            </div>
            <div className='btn btn-light go-back' onClick={() => navigate('/')}>
                <TiArrowBack fontSize={'24px'} /> Go back home
            </div>
            <div className='title col-4'>
                <h1>Kaka quizz</h1>
            </div>
            <div className='welcome col-4'>
                <h5>Start your journey!</h5>
            </div>
            <div className='form-content col-4'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email' >Email(*)</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='username' >Username</label>
                        <input
                            type='text'
                            className='form-control'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' >Password(*)</label>
                        <div className='input-group'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                id='password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                                autoComplete="current-password"
                            />
                            <div
                                className='icon-eye'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <p className='forget-password'>Forgot password?</p>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => handleRegister()}
                    >Create my free account </button>
                </form>
            </div>
        </div>
    )
}

export default Register;