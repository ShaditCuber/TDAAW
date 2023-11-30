import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from "@mui/material";

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        // Handle password reset logic here
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em' }}>
            <Typography variant="h4">Forgot Password</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleResetPassword} sx={{ margin: '1em' }}>
                Reset Password
            </Button>
        </Box>
    );
};

export default ForgotPasswordComponent;
