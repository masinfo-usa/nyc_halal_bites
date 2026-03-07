import React from 'react';
import { Box, Typography, Button, Divider, Stack, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function LoginPage() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      {/* Logo */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Your App
      </Typography>

      {/* Login Buttons */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: '#4285F4',
            color: 'white',
            '&:hover': { backgroundColor: '#357ae8' },
            textTransform: 'none',
          }}
          fullWidth
        >
          Continue with Google
        </Button>

        <Button
          variant="contained"
          startIcon={<AppleIcon />}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': { backgroundColor: '#333' },
            textTransform: 'none',
          }}
          fullWidth
        >
          Continue with Apple
        </Button>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          fullWidth
        >
          Log in with email
        </Button>
      </Stack>

      {/* Footer */}
      <Box sx={{ marginTop: 3, fontSize: 14, color: 'text.secondary' }}>
        <Typography>
          By continuing, you agree to our{' '}
          <a href="/terms" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            Privacy Policy
          </a>.
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;
