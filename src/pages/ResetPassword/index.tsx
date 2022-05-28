import { useEffect, useState } from 'react';

import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { handleErrorResponse } from '../../utils/error-response';

import * as S from './styles';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .required('A senha atual é obrigatória.')
    .max(60, 'Máximo de 60 caracteres'),
  newPassword: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .required('A senha nova é obrigatória.')
    .max(60, 'Máximo de 60 caracteres'),
  confirmNewPassword: Yup.string()
    .min(6, 'Senha precisa ter no mínimo 6 caracteres')
    .required('A confirmação de senha é obrigatória.')
    .oneOf([Yup.ref('newPassword'), null], 'Senhas não correspondem')
    .max(60, 'Máximo de 60 caracteres'),
});

const ResetPassword = (): JSX.Element => {
  const { updatePassword } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) {
      history.push('/');
    }
  }, [history, location.state?.email]);

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      await updatePassword({
        user: location.state?.email,
        currentPassword,
        newPassword,
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
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      handleUpdatePassword(values.currentPassword, values.newPassword);
    },
  });

  return (
    <S.Wrapper>
      <S.ContainerImage />
      <S.ContainerLogin>
        <S.ContainerInfo>
          <img src="/img/logo.png" alt="Logo" />
          <h1>Senha expirada. Atualize para continuar!</h1>
        </S.ContainerInfo>
        <S.Form onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <Alert severity="error" onClose={onCloseAlert} sx={S.AlertStyles}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            id="currentPassword"
            name="currentPassword"
            label="Senha atual"
            type="password"
            sx={S.TextFieldStyles}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            id="newPassword"
            name="newPassword"
            label="Nova senha"
            type="password"
            sx={S.TextFieldStyles}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirmar nova senha"
            type="password"
            sx={S.TextFieldStyles}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
            helperText={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={S.ButtonStyles}
          >
            Alterar senha
          </Button>
        </S.Form>
      </S.ContainerLogin>
    </S.Wrapper>
  );
};

export default ResetPassword;
