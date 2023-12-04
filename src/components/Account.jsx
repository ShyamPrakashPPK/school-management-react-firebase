// Account.js
import React, { useState } from "react";
import SideNav from "./SideNav";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useAppStore } from "../appStore";

export default function Account() {
    const [username, setUsername] = useState(useAppStore.getState().user.username || "");
    const [usernameError, setUsernameError] = useState("");

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        // Custom validation for username
        const isValid = /^[a-zA-Z][a-zA-Z0-9_.-]{3,29}$/.test(newUsername);
        setUsernameError(isValid ? "" : "Invalid username");
        setUsername(newUsername);
    };

    const handleSave = () => {
        // Add logic to save changes to the backend
        // You can use an API call or state management library like Redux for this purpose
        // Update the sidebar in real-time
        useAppStore.setState({ user: { ...useAppStore.getState().user, username: username } });
    };

    return (
        <>
            <div className="body" style={{ backgroundColor: "rgb(44, 121, 173)", height: "100vh" }}>
                <Box sx={{ display: "flex" }}>
                    <SideNav />

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Account Settings
                                </Typography>

                                <form>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={!!usernameError}
                                        helperText={usernameError}
                                        margin="normal"
                                    />

                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </>
    );
}
