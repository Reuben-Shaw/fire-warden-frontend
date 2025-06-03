import { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [staffNumber, setNumber] = useState('');
    const [password, setLastName] = useState('');

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setLastName(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            staff_number: staffNumber,
            password: password
        };

        try {
            const response = await fetch('https://fire-warden-api.azurewebsites.net/api/tryLogin?', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();
            if (result.success) {
                onLoginSuccess();
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <div className='login-page'>
            <div className='login-left'>
                <div className="image-container">
                    <img
                        src="/images/West-Downs.jpg"
                        alt="Welcome illustration"
                        className="left-image"
                    />
                    <div className="left-content">
                        <h1>Welcome Back</h1>
                        <p className="login-text">Login to register your location, for wardens, or, for health staff, manage safety across campus</p>
                    </div>
                </div>
            </div>
            <div className='login-right'>
                <div className='login-box'>
                    <h2>Login</h2>
                    <form>
                        <label>Staff Number</label>
                        <input
                            type='text'
                            value={staffNumber}
                            onChange={handleNumberChange}
                            required
                        />
                        <label>Password</label>
                        <input 
                            type='password' 
                            value={password}
                            onChange={handlePasswordChange}
                            required 
                        />
                        <button type='submit' onSubmit={handleLogin}>Sign In</button>
                        <p className="register-text">
                            Don't have an account?{' '}
                            <a href="/register" className="register-link">
                                Register
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
