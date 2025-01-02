import React from 'react';
import styles from './ForgotPassword.module.scss';
import { TextField, Button, Typography, Box } from '@mui/material';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <div className={styles['forgot-password-container']}>
      <Box className={styles['forgot-password-card']}>
        <Typography variant="h4" className={styles['title']}>
          Reset Password
        </Typography>
        <Typography className={styles['instructions']}>
          Enter your email address, and we’ll send you instructions to reset
          your password.
        </Typography>
        <form className={styles['form']}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={styles['submit-button']}
          >
            Send Reset Link
          </Button>
        </form>
        <Link href="/login" passHref>
          <Typography className={styles['back-link']}>
            Back to Login
          </Typography>
        </Link>
      </Box>
    </div>
  );
};

export default ForgotPassword;
