import './Login.scss'
import { useState } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        alert('Login success!');
    }

    return (
        <div
            className='login-container'
        >
            <div className='header'>
                Don't have an account? <a href='/signup'>Sign up</a>
            </div>
            <div className='title col-4'>
                <h1>Kaka quizz</h1>
            </div>
            <div className='welcome col-4'>
                <h4>Hello, who's this?</h4>
            </div>
            <div className='form-content col-4'>
                <div className='form-group'>
                    <label for='email' >Email</label>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label for='password' >Password</label>
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
                >Log in</button>
            </div>
        </div>
    )
}

export default Login;