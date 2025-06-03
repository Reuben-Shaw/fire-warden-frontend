import { useState } from 'react';

function Login({ onLoginSuccess }) {
    const [number, setNumber] = useState('');
    const [lastName, setLastName] = useState('');

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            staff_number: number,
            last_name: lastName
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
        <div className='Login'>
            <h1>Fire Warden Tracker</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Staff Number:</label>
                    <input
                        type='text'
                        value={number}
                        onChange={handleNumberChange}
                        placeholder='Enter a Number'
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Enter Last Name"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
