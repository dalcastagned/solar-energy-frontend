import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

export const Bot = styled('img')(() => ({
  width: '70rem',
  marginTop: '-20rem',
  marginLeft: '-13rem',
}));

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 10.4rem)',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const TitleCode = styled('h1')(() => ({
  marginTop: '-13rem',
  marginBottom: '1rem',
}));

export const DetailsCode = styled('p')(() => ({
  marginBottom: '2rem',
}));

export const ReturnButton = styled(Button)(() => ({
  height: '5rem',
  fontSize: '1.6rem',
}));
