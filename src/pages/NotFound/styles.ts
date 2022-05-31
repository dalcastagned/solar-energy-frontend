import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

export const Bot = styled('img')(() => ({
  width: '100%',
  maxWidth: '70rem',
  margin: '-20rem auto 0 auto',
}));

export const Wrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const TitleCode = styled('h1')(() => ({
  marginTop: '-13rem',
  marginBottom: '1rem',
  fontSize: '3rem',
  textAlign: 'center',

  '@media screen and (max-width: 580px)': {
    marginTop: '-10rem',
  },

  '@media screen and (max-width: 480px)': {
    marginTop: '-5rem',
  },
}));

export const DetailsCode = styled('p')(() => ({
  marginBottom: '2rem',
  fontSize: '1.6rem',
  textAlign: 'center',
}));

export const ReturnButton = styled(Button)(() => ({
  height: '5rem',
  fontSize: '1.6rem',
}));
