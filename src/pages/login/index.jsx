import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import LoginListener from "../../components/form/login";
import { LoginUser } from "../../posts/auth/login";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function LoginPage() {
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const result = await LoginUser(
                data,
                () => {
                // Callback function for successful login
                setLoginResult({
                    success: true,
                    message: "Login successful. Redirecting to profile...",
                });

                // Redirect to the profile page or the desired URL
                navigate("/"); 
                },
                (errorMessage) => {
                // Callback function for login error
                setLoginResult({
                    success: false,
                    message: errorMessage,
                });
                }
            );
            } catch (error) {
            console.error("Error during logging in:", error);
            setLoginResult({
                success: false,
                message: "Login failed. Please try again later.",
            });
        }
    };

    return (
        <div>
            <h1>Welcome to Holidaze</h1>
            {loginResult && (
                <Alert variant={loginResult.success ? "success" : "danger"}>
                {loginResult.message}
                </Alert>
            )}
            <LoginListener onLogin={handleLogin} />
        </div>
    );
}
