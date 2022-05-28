import Button from '@mui/material/Button';
import styled from 'styled-components';

export const Bot = styled.img`
  width: 70rem;
  margin-top: -20rem;
  margin-left: -13rem;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const TitleCode = styled.h1`
  margin-top: -13rem;
  margin-bottom: 1rem;
`;

export const DetailsCode = styled.p`
  margin-bottom: 2rem;
`;

export const ReturnButton = styled(Button)`
  height: 5rem;
`;
