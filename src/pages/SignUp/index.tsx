import { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Fade, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { handleErrorResponse } from '../../utils/error-response';

import * as S from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Entre com um email válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .required('A senha é obrigatória.')
    .max(60, 'Máximo de 60 caracteres'),
  confirmPassword: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .required('A confirmação de senha é obrigatória.')
    .oneOf([Yup.ref('password'), null], 'Senhas não correspondem')
    .max(60, 'Máximo de 60 caracteres'),
});

const SignUp = (): JSX.Element => {
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleSignUp = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      await signUp({
        email,
        password,
      });
      history.push('/');
    } catch (err) {
      setErrorMessage(handleErrorResponse(err, location.pathname));
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
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      handleSignUp(values.email, values.password);
    },
  });

  return (
    <S.Wrapper>
      <S.ContainerImage />
      <Fade in timeout={1000}>
        <S.ContainerSignUp>
          <S.ContainerInfo>
            <img src="/img/logo.png" alt="Logo" />
            <h1>Seja bem-vindo</h1>
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
            <S.TextFieldStyled
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              InputProps={{
                placeholder: 'Confirme sua senha',
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <S.ButtonStyled
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Cadastrar
            </S.ButtonStyled>
          </S.Form>
          <S.LinkStyled href="/">
            Já possui uma conta? Faça o login!
          </S.LinkStyled>
        </S.ContainerSignUp>
      </Fade>
    </S.Wrapper>
  );
};

export default SignUp;
