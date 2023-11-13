import * as React from 'react'
import { useState } from 'react';
import { Alert, Button, CssBaseline, TextField, Link, Grid, 
         Box, Typography, Container } from '@mui/material'
import Header from '../components/Header'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase';
import { Navigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setRedirectToHome(true);
    } 
    catch (error) {
      setError(error.message)
    }
  }

  if (redirectToHome) {
    return <Navigate replace to="/" />
  }

  return (
      <Container component="main" maxWidth="xs">
        <Header/>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Alert severity='error'>{error}</Alert>}
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{ input: { color: 'white'},}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ input: { color: 'white'},}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/Forgot_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/Sign_up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  )
}

export default SignIn