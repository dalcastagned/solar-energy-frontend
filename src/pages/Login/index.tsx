import { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Fade, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { LoginCredentials } from '../../models/user';
import { ErrorResponse, handleErrorResponse } from '../../utils/error-response';

import * as S from './styles';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Entre com um email válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .max(60, 'Máximo de 60 caracteres')
    .required('Senha é obrigatória'),
});

const Login = (): JSX.Element => {
  const { signIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      await signIn(credentials);
    } catch (err) {
      const errorMessageToValidate = (
        err as ErrorResponse
      ).response?.data?.toString();

      if (errorMessageToValidate?.includes('Password expired')) {
        history.push(`/reset-password`, { email: credentials.email });
      }
      setErrorMessage(handleErrorResponse(err));
      setLoading(false);
    }
  };

  const onCloseAlert = (): void => {
    setErrorMessage('');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      handleLogin(values);
    },
  });

  return (
    <S.Wrapper>
      <S.ContainerImage />
      <Fade in timeout={1000}>
        <S.ContainerLogin>
          <S.ContainerInfo>
            <img src="/img/logo.png" alt="Logo" />
            <h1>Seja bem vindo</h1>
          </S.ContainerInfo>
          <S.Form onSubmit={formik.handleSubmit}>
            {errorMessage && (
              <S.AlertStyled severity="error" onClose={onCloseAlert}>
                {errorMessage}
              </S.AlertStyled>
            )}
            <S.TextFieldStyled
              id="email"
              name="email"
              label="Email"
              InputProps={{
                placeholder: 'exemplo@exemplo.com',
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <S.TextFieldStyled
              id="password"
              name="password"
              label="Senha"
              type="password"
              InputProps={{
                placeholder: 'Digite sua senha',
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <S.ButtonStyled
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Entrar
            </S.ButtonStyled>
          </S.Form>
          <S.LinkStyled href="/signup">
            Ainda não possui uma conta? Cadastre-se!
          </S.LinkStyled>
        </S.ContainerLogin>
      </Fade>
    </S.Wrapper>
  );
};

export default Login;
