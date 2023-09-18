import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { RegisterUser } from '../../posts/auth/register';
import RegisterListener from '../../components/form/register';


export default function RegisterPage() {
  const [registerResult, setRegisterResult] = useState(null);

  const handleRegister = async (data) => {
    try {
      const result = await RegisterUser(data,);

      if (result.success) {
        setRegisterResult({
          success: true,
          message: 'Registration successful. Redirecting to login...',
        });

         // Redirect to the login page or any other page

      } else {
        setRegisterResult({
          success: false,
          message: result.message || 'Registration failed. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterResult({
        success: false,
        message: 'Registration failed. Please try again later.',
      });
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      {registerResult && (
        <Alert variant={registerResult.success ? 'success' : 'danger'}>
          {registerResult.message}
        </Alert>
      )}
      <RegisterListener onRegister={handleRegister} />
    </div>
  );
}

