import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Context from '../context/Context';
import LoginIcon from '@mui/icons-material/Login';
import {
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreateUserPanel } from '../components/CreateUserPanel';
import { getUser, registerUser } from '../services/auth.service';

export const LoginPage = () => {
  const { setLoading, email, setEmail, setAccessToken, setRefreshToken } =
    useContext(Context);
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [userName, setCreateUserName] = useState('');
  const [userEmail, setCreateUserEmail] = useState('');
  const [userPassword, setCreateUserPassword] = useState('');
  const [isReload, setIsReload] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  let navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0e055f',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (isSubmit) {
        try {
          await getUser(
            email,
            password,
            setAccessToken,
            setRefreshToken,
            setIsSubmit,
            setIsLogin,
          );
        } catch (error) {
          setLoading(false);
          console.error('Error during user login:', error);
        }
      }
    };

    fetchData();
  }, [isSubmit, isReload]);

  const handleSubmit = () => {
    setIsSubmit(true);
  };

  const handleCreate = async () => {
    setCreatingUser(false);
    if (!userName || !userEmail || !userPassword) {
      window.alert('Please fill all the fields');
    } else if (regexExp.test(userEmail)) {
      try {
        await registerUser(
          userName,
          userEmail,
          userPassword,
          setIsReload,
          navigate,
          setCreatingUser,
        );
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    } else {
      window.alert('Please enter a valid email');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ThemeProvider theme={theme}>
        <CreateUserPanel
          close={() => setCreatingUser(false)}
          status={creatingUser}
          method={'Create new User'}
          username={(e: any) => setCreateUserName(e.target.value)}
          useremail={(e: any) => setCreateUserEmail(e.target.value)}
          userpassword={(e: any) => setCreateUserPassword(e.target.value)}
          submit={handleCreate}
        ></CreateUserPanel>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
        >
          <Typography
            paddingLeft={2}
            variant="h2"
            component="div"
            fontWeight={500}
            maxWidth={440}
            textAlign={'center'}
            color={'#0e055f'}
            sx={{ flexGrow: 1 }}
          >
            Gamefeedr
          </Typography>
        </Container>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            flexDirection: 'column',
          }}
        >
          <Typography color="primary">Email</Typography>
          <TextField
            sx={[isLogin ? {} : { border: '1px solid red', borderRadius: 2 }]}
            type="text"
            className="login-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography color="primary" sx={{ marginTop: 2 }}>
            Password
          </Typography>
          <TextField
            sx={[isLogin ? {} : { border: '1px solid red', borderRadius: 2 }]}
            type="password"
            className="login-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Container>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Button
            type="button"
            className="submit-button"
            disabled={isSubmit}
            onClick={handleSubmit}
            variant="contained"
            sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
          >
            <LoginIcon />
          </Button>
          <Button variant="outlined" onClick={() => setCreatingUser(true)}>
            <Typography>Register</Typography>
          </Button>
        </Container>
      </ThemeProvider>
    </Container>
  );
};
