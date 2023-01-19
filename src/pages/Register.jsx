import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { thunks as userThunks } from '../redux/slices/usersSlice'
// import { reset, register } from '../redux/slices/userSlice'
export default function Register() {
  // const { signUp } = useAuth();
  const navigate = useNavigate()
  //   const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })
  //   const { user, isLoading, isError, isSuccess, message } = useSelector(
  //     (state) => state.auth
  //   )

  const registerUser = (event) => {
    event.preventDefault()
    // const data = new FormData(event.currentTarget);

    // console.log({ form });
    dispatch(register(form))
    // .unwrap()
    // .then(() => navigate("/"));
    // await signUp(data.get("email"), data.get("password"), data.get("name"));
  }

  const onFormChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (isError) {
      console.log({ message })
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <div>...Loading</div>
  }
  return (
    <Container component={'main'} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'secondary.main',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={'h1'} variant="h5">
          Sign Up
        </Typography>
        <Box component={'form'} sx={{ mt: 3 }} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onFormChange}
                autoComplete="email"
                fullWidth
                required
                name="email"
                id="email"
                label="Email"
                value={form.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onFormChange}
                autoComplete="new-password"
                fullWidth
                type="password"
                required
                name="password"
                id="password"
                label="Password"
                value={form.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Link variant="body2" href="/login">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
