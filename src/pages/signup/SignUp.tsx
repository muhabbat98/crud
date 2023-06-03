import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { postAPI } from '../../util/axios';
import { redirect, useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface clickedStatus {
  name:boolean,
  email:boolean,
  password:boolean

}

export default function SignUp() {
  
  const [clicked, setClicked] = React.useState<clickedStatus>({
    name:false,
    email:false,
    password:false
  })
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    if( data.get('email')&& data.get('email')&& data.get('name')&& data.get('password')&&!clicked.email){
      
      const res = await postAPI('/signup', JSON.stringify({
        "name":     data.get('name'),
        "email":    data.get('email'),
        "key":      data.get('password'),
        "secret":   "MySecret"
      }))
      console.log("RESPONSE ",res)
      if( await res&&res.status===200){
        navigate('/')
      }
    }else{
      setClicked({
        name: !data.get('name'),
        email:data.get('email')&& data.get('email')?.toString().includes('@')&& data.get('email')?.toString().includes('.')?false:true,
        password:!data.get('password')
      })
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={clicked.name}
                  onChange={(e)=>setClicked({...clicked, name: !e.target.value}) }
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={clicked.email}
                  onChange={(e)=>e.target.value?.includes('@')&&e.target.value?.includes('.')? setClicked({...clicked, email: !e.target.value}):setClicked({...clicked, email: true}) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={clicked.password}
                  onChange={(e)=>setClicked({...clicked, password: !e.target.value}) }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}