import { Alert, Button, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}));

export const ContainerImage = styled('div')(() => ({
  flex: '1',
  background:
    'linear-gradient(150deg, rgba(246,171,61,1) 0%, rgba(117,173,78,1) 80%)',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',

  '& img': {
    width: '50%',
  },

  '@media screen and (max-width: 980px)': {
    display: 'none',
  },
}));

export const ContainerResetPassword = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  justifyContent: 'center',
  alignItems: 'center',

  '@media screen and (max-width: 980px)': {
    width: '100%',
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) -10%, rgba(255, 255, 255, 0.9) 180%), url('/img/solar-panel.svg')",
    backgroundSize: 'cover',
  },
}));

export const ContainerInfo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',

  '& img': {
    maxWidth: '28rem',

    '@media screen and (max-width: 480px)': {
      maxWidth: '180px',
    },
  },

  '& h1': {
    fontSize: '2.4rem',
    color: '#374557',
    fontWeight: '500',
    lineHeight: '3.2rem',
    textAlign: 'center',
    padding: '4rem 0',

    '@media screen and (max-width: 320px)': {
      fontSize: '20px',
    },
  },
}));

export const Form = styled('form')(() => ({
  width: '100%',
  padding: '0 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  alignItems: 'center',
}));

export const TextFieldStyled = styled(TextField)(() => ({
  width: '100%',
  maxWidth: '51.8rem',
  label: { fontSize: '1.6rem' },
  input: { fontSize: '1.6rem' },
  '& .MuiOutlinedInput-root': { fontSize: '1.6rem' },
  '& p': { fontSize: '1.2rem' },
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
}));

export const ButtonStyled = styled(Button)(() => ({
  width: '100%',
  maxWidth: '51.8rem',
  height: '5rem',
  fontSize: '2rem',
  fontWeight: '500',
}));

export const AlertStyled = styled(Alert)(() => ({
  fontSize: '1.6rem',
  width: '100%',
  maxWidth: '51.8rem',
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
}));
