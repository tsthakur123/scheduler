"use client"
import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from '@/utils/axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token
      router.push('/interview'); // Redirect to the interview page after login
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginPage;
