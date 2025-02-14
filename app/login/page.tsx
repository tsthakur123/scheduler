"use client"
import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, CircularProgress } from '@mui/material';
import axios from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const { login } = useAuth(); // Get login function from AuthContext
  const router = useRouter(); // Initialize router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submission

    try {
      const response = await axios.post('https://scheduler-backend-z614.onrender.com/api/auth/login', { email, password });
      login(response.data.token); // Use login from AuthContext
      // router.push('/interview'); // Redirect to dashboard after successful login
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
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
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="text" onClick={() => router.push('/register')} fullWidth>
              Don't have an account? Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginPage;
