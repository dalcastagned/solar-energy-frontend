import { Alert, Box, Paper } from '@mui/material';

import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'flex-end',
  flexDirection: 'column',
  gap: '3rem',
}));

export const ContainerCards = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  margin: '0 auto',
  flexWrap: 'wrap',
  gap: '2rem',
}));

export const Card = styled(Paper)(() => ({
  maxWidth: '25.8rem',
  height: '13.4rem',
  width: '100%',
  textAlign: 'center',
  border: ' 0.1rem solid #DFE0EB',
  background: '#fff',
  borderRadius: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  '@media screen and (max-width: 580px)': {
    maxWidth: '16rem',
    height: '10rem',
  },

  '&:hover': {
    border: ' 0.1rem solid #3751FF',

    '& h2': {
      color: '#3751FF',
    },

    '& p': {
      color: '#3751FF',
    },
  },

  '& h2': {
    fontSize: '1.9rem',
    fontWeight: '700',
    color: '#9FA2B4',

    '@media screen and (max-width: 580px)': {
      fontSize: '1.6rem',
    },
  },

  '& p': {
    fontSize: '4rem',
    fontWeight: '700',
    color: '#252733',
    paddingTop: '1.2rem',

    '@media screen and (max-width: 580px)': {
      fontSize: '2.2rem',
    },
  },

  '& span': {
    paddingLeft: '0.5rem',
  },
}));

export const ContainerChart = styled(Box)(() => ({
  width: '100%',
  maxWidth: '110rem',
  maxHeight: '64rem',
  border: '1px solid #E5E5E5',
  borderRadius: '0.4rem',
  padding: '3rem',
  margin: '2rem auto 0 auto',

  '& h1': {
    paddingBottom: '3rem',
    fontWeight: '500',
    fontSize: '2rem',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export const Loading = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 10.4rem)',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const AlertStyled = styled(Alert)(() => ({
  fontSize: '1.6rem',
  width: '100%',
}));
