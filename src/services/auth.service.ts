import { ApiClient } from '../apiClient/apiClient';

export const registerUser = async (
  userName: string,
  userEmail: string,
  userPassword: string,
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void,
  setCreatingUser: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  await ApiClient.getInstance()
    .post(`${process.env.REACT_APP_API_BASE_URL}/user/registration`, {
      name: userName,
      email: userEmail,
      password: userPassword,
    })
    .then((res) => {
      setIsReload(true);
      navigate('/home');
      setCreatingUser(false);
    });
};

export const getUser = async (
  email: string,
  password: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>,
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  await ApiClient.getInstance()
    .post(`${process.env.REACT_APP_API_BASE_URL}/auth/signin`, {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setAccessToken(res.data.tokens.accessToken);
        setRefreshToken(res.data.tokens.refreshToken);
        setIsSubmit(true);
        localStorage.setItem('accessToken', res.data.tokens.accessToken);
        localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
    })
    .catch((err) => {
      setIsSubmit(false);
      setIsLogin(false);
    });
};
