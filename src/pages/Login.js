import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to backend with username and password
      const response = await axios.post('http://localhost:4000/admin/login', {
        username,
        password,
      });

      // storing the token for authentication
      const { token } = response.data;

      // Saving token in localStorage
      localStorage.setItem('authToken', token);

      // Redirect to the dashboard after successfully login
      navigate('/admin-dashboard'); 
    } catch (error) {
      setError('Invalid username or password');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#fe9e0d",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#fe9e0d",
                  },
                },
              }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#fe9e0d", 
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#fe9e0d",
                  },
                },
              }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: '#fe9e0d',
              '&:hover': {
                backgroundColor: '#fe9e0d',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
