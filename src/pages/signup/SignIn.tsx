import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAPI } from '../../util/axios';
import {  useNavigate, Link } from 'react-router-dom';
import MD5 from 'crypto-js/md5';
import { useAuth } from '../../util/auth';
import Alert from '@mui/material/Alert';
import AlertDialog from './SignOut';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface clickedStatus {
  name: boolean;
  password: boolean;
}

export default function SignIn() {
  const [clicked, setClicked] = React.useState<clickedStatus>({
    name: false,
    password: false
  });
  const [err, setError] = React.useState('');
  const navigate = useNavigate();

  const [user, setUser] = useAuth(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('name') && data.get('password')) {
      try {
        await getAPI('/myself', {
          sign: MD5('GET/myselfMySecret').toString(),
          key: data.get('password')
        })
          .then((res) => {
            console.log('response   ', res);
            if (res && res.status === 200) {
              let connect = MD5('GET/myselfMySecret').toString();
              localStorage.setItem('sign', connect);
              localStorage.setItem('key', res.data.data.key);
              setUser({
                sign: connect,
                key: res.data.data.key
              });
              navigate('/');
            } else if (res.status === undefined) {
              setError(res.data.data.message);
              // setError(res.data.data.message);
            }
          })
          .catch((error) => {
            setError(error);
          });
      } catch (error: any) {
        setError(error);
      }
    } else {
      setClicked({
        name: !data.get('name'),
        password: !data.get('password')
      });
    }
  };
  if (user.sign) {
    return <AlertDialog />;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                  error={clicked.name}
                  onChange={(e) =>
                    setClicked({ ...clicked, name: !e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  error={clicked.password}
                  onChange={(e) =>
                    setClicked({ ...clicked, password: !e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {err.length ? (
              <Grid container justifyContent='center'>
                <Grid item>
                  <Alert variant='filled' severity='error'>
                    {err}
                  </Alert>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to={'/signup'}>Don't you have account? Sign up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
