import { useState } from 'react';

import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { LoginCredentials } from '../../models/user';
import { ErrorResponse, handleErrorResponse } from '../../utils/error-response';

import * as S from './styles';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Entre com um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
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
      <S.ContainerLogin>
        <S.ContainerInfo>
          <img src="/img/logo.png" alt="Logo" />
          <h1>Seja bem vindo</h1>
        </S.ContainerInfo>
        <S.Form onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <Alert severity="error" onClose={onCloseAlert} sx={S.AlertStyles}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            id="email"
            name="email"
            label="Email"
            sx={S.TextFieldStyles}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Senha"
            type="password"
            sx={S.TextFieldStyles}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={S.ButtonStyles}
          >
            Entrar
          </Button>
        </S.Form>
      </S.ContainerLogin>
    </S.Wrapper>
  );
};

export default Login;
