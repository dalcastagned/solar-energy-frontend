import {
  Alert,
  Button,
  Card,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  CardActions,
} from '@mui/material';

import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'flex-end',
  flexDirection: 'column',
  gap: '3rem',
}));

export const TableHeadStyled = styled(TableHead)(() => ({
  backgroundColor: '#374557',
}));

export const TableCellTopStyled = styled(TableCell)(() => ({
  color: '#fff',
  fontSize: '1.6rem',
}));

export const TableRowStyled = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': { border: 0 },
  backgroundColor: '#fafafa',
  '&:hover': { backgroundColor: '#eaeaea' },
}));

export const TableCellBodyStyled = styled(TableCell)(() => ({
  fontSize: '1.3rem',
  cursor: 'pointer',
}));

export const ButtonEdit = styled(Button)(() => ({
  fontSize: '1.3rem',
  backgroundColor: '#8DB51B',
  color: '#fff',
  height: '3.5rem',
  width: '7.8rem',
  borderRadius: '0.4rem',
  '&:hover': {
    backgroundColor: '#7AAE1B',
  },
}));

export const ButtonRemove = styled(Button)(() => ({
  fontSize: '1.3rem',
  backgroundColor: '#D82D56',
  color: '#fff',
  height: '3.5rem',
  width: '10rem',
  borderRadius: '0.4rem',
  '&:hover': {
    backgroundColor: '#B61D4B',
  },
}));

export const ButtonNewPlant = styled(Button)(() => ({
  fontSize: '1.6rem',
  backgroundColor: '#4C5DF1',
  color: '#fff',
  height: '5.6rem',
  width: '25rem',
  borderRadius: '0.4rem',
  '&:hover': {
    backgroundColor: '#3C4DF0',
  },
}));

export const ContainerTable = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'flex-end',
  flexDirection: 'column',
  gap: '3rem',

  '@media screen and (max-width: 1023px)': {
    display: 'none',
  },
}));

export const AlertStyled = styled(Alert)(() => ({
  fontSize: '1.6rem',
  width: '100%',
}));

export const Loading = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 10.4rem)',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const TextFieldStyled = styled(TextField)(() => ({
  width: '100%',
  maxWidth: '35rem',
  label: { fontSize: '1.6rem' },
  input: { fontSize: '1.6rem' },
  '& p': { fontSize: '1.2rem' },
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
}));

export const Form = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  gap: '3rem',
  alignItems: 'center',
  flexWrap: 'wrap',

  '@media screen and (max-width: 1023px)': {
    justifyContent: 'center',
  },
}));

export const ButtonSearch = styled(Button)(() => ({
  fontSize: '1.6rem',
  backgroundColor: '#4C5DF1',
  color: '#fff',
  height: '5.6rem',
  width: '15rem',
  borderRadius: '0.4rem',
  '&:hover': {
    backgroundColor: '#3C4DF0',
  },
}));

export const CardStyled = styled(Card)(() => ({
  minWidth: 260,
  backgroundColor: '#fafafa',
}));

export const ContainerCard = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '3rem',
  alignItems: 'center',
  justifyContent: 'center',

  '@media screen and (min-width: 1023px)': {
    display: 'none',
  },
}));

export const BoxStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
}));

export const ButtonEditStyled = styled(Button)(() => ({
  '& .MuiSvgIcon-root': { fontSize: '2.25rem', color: '#8DB51B' },
}));

export const ButtonRemoveStyled = styled(Button)(() => ({
  '& .MuiSvgIcon-root': { fontSize: '2.25rem', color: '#B61D4B' },
}));

export const CardActionsStyled = styled(CardActions)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
}));
