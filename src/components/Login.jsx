import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from "@mui/material";

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em' }}>
                <Typography variant="h4">Login</Typography>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleLogin} sx={{ margin: '1em' }}>
                    Login
                </Button>
            </Box>
        </>
    );
};

export default LoginComponent;
