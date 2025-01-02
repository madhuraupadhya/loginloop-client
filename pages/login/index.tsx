import React, { useState } from 'react';
import styles from './Login.module.scss';
import { TextField, Button, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Save the JWT token in localStorage or cookies
        localStorage.setItem('access_token', data.access_token);
        // Redirect to a protected page (e.g., dashboard)
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className={styles['login-container']}>
      <Box className={styles['login-card']}>
        <Typography variant="h4" align="center" className={styles['login-title']}>
          Welcome Back
        </Typography>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}  // Bind email state to input value
            onChange={(e) => setEmail(e.target.value)}  // Update email state on change
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}  // Bind password state to input value
            onChange={(e) => setPassword(e.target.value)}  // Update password state on change
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"  // Set the button type to 'submit'
            className={styles['login-button']}
          >
            Login
          </Button>
        </form>
        {error && (
          <Typography className={styles['error-message']} color="error">
            {error}
          </Typography>
        )}
        <Typography className={styles['forgot-password']}>
          <Link href="/forgot-password" passHref>
            Forgot your password?
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
