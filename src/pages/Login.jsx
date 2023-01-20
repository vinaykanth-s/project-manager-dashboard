import React, { useState, useEffect, useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/init'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'LOGIN', payload: user })
      }
    })
  }, [auth])
  const signIn = (event) => {
    event.preventDefault()
    setLoading(true)
    const { email, password } = event.target
    console.log({ email, password })
    signInWithEmailAndPassword(auth, 'admin@demo.com', 'test123')
      .then(({ user }) => {
        dispatch({ type: 'LOGIN', payload: user })
        console.log('Singed in user: ', user)
        navigate('/')
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  // const loginUser = () => {}
  // //   if (isLoading) {
  // //     return <div>...Loading</div>
  // //   }
  return (
    <Container component={'main'} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={'h1'} variant="h5">
          Sign In
        </Typography>
        <form
          onSubmit={signIn}
          sx={{
            width: '100%',
            mt: 1,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            type="email"
            autoComplete="off"
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            autoFocus
            type="password"
            autoComplete="current-password"
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            // disabled={isLoading}
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Sign In
          </Button>
        </form>
        <Grid container justifyContent={'flex-end'}>
          <Grid item>
            <Link variant="body2" href="/register">
              New User? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
