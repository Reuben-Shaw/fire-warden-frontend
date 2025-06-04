import { useState } from 'react';
import './Login.css';
import '../App.css';
import config from '../config'

function Login({ onLoginSuccess }) {
  const [staffNumber, setNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPasswordName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordName(event.target.value);
  };

  const toggleMode = () => {
    setIsRegistering(prev => !prev);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      staff_number: staffNumber,
      password: password
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/tryLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();
      if (result.success) {
        onLoginSuccess(staffNumber, result.isWarden);
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const registerData = {
      staff_number: staffNumber,
      first_name: firstName,
      last_name: lastName,
      password: password
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/registerWarden?`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Successfully registered with the system')
      } else {
        alert(result.message || 'Registering failed');
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
            <h1>{isRegistering ? 'Welcome' : 'Welcome Back'}</h1>
            <p className="login-text"> {
              isRegistering ?
                'Your staff number must already be in the system to register, if it\'s not please contact health and safety staff' :
                'Login to register your location, for wardens, or, for health staff, manage safety across campus'
            }
            </p>
          </div>
        </div>
      </div>
      <div className='login-right'>
        <div className='login-box' onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <form>
            <label>Staff Number</label>
            <input
              type='text'
              value={staffNumber}
              onChange={handleNumberChange}
              required
            />
            {isRegistering && (
              <>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </>
            )}
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type='submit'>{isRegistering ? 'Register' : 'Login'}</button>
            <p className="register-text">
              {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
              <a
                href="/"
                className="register-link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
              >
                {isRegistering ? 'Login' : 'Register'}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
