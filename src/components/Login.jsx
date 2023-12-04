import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Card, CardContent, Container } from "@mui/material";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                        Firebase Auth Login
                    </Typography>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email address"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ marginTop: '16px' }}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Log In
                            </Button>
                        </div>
                    </form>
                    <div className="p-4 box mt-4 text-center">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                    <div  style={{ marginTop: '16px', width: '100%' }}>
                        <GoogleButton
                            className="g-btn"
                            type="dark"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                    
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
