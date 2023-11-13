import * as React from 'react'
import { useState } from 'react'
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, 
         Container, Alert } from '@mui/material'
import Header from '../components/Header'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { Link as RouterLink } from 'react-router-dom';



const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword)  {
      return setError("Passwords do not match")
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } 
    catch (error) {
      setError(error.message)
    }
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
            Sign up
          </Typography>
         {error && <Alert severity='error'>{error}</Alert>}
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ input: { color: 'white'},}}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ input: { color: 'white'},}}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ input: { color: 'white'},}}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ input: { color: 'white'},}}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ input: { color: 'white'},}}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link component={RouterLink} to="/Sign_in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

  )
}

export default SignUp