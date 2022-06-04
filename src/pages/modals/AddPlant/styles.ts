import { TextField, Button, FormControlLabel, Alert } from '@mui/material';

import { styled } from '@mui/material/styles';

export const TextFieldStyled = styled(TextField)(() => ({
  width: '100%',
  maxWidth: '51.8rem',
  label: { fontSize: '1.6rem' },
  input: { fontSize: '1.6rem' },
  '& .MuiOutlinedInput-root': { fontSize: '1.6rem' },
  '& p': { fontSize: '1.2rem' },
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
}));

export const Form = styled('form')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '40rem',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fafafa',
  boxShadow: '2.4rem',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  gap: '3rem',
  borderRadius: '0.4rem',

  '@media screen and (max-width: 420px)': {
    minWidth: '95%',
  },
}));

export const ButtonStyled = styled(Button)(() => ({
  fontSize: '1.3rem',
  height: '3.5rem',
  width: '10rem',
  borderRadius: '0.4rem',
}));

export const Checkbox = styled(FormControlLabel)(() => ({
  '& .MuiTypography-root': { fontSize: '1.6rem' },
  '& .MuiSvgIcon-root': { fontSize: '2.5rem' },
}));

export const AlertStyled = styled(Alert)(() => ({
  fontSize: '1.6rem',
  width: '100%',
  maxWidth: '51.8rem',
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
}));
