import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="p-4 loginBody boxx">
                <Typography variant="h6" className="mb-3">
                    Firebase Auth Signup
                </Typography>
                {error && <Alert variant="filled" severity="error">{error}</Alert>}
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
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/">Log In</Link>
            </div>
        </>
    );
};

export default Signup;
