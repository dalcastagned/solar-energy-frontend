import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;

export const ContainerImage = styled.div`
  width: 50%;
  height: 100%;
  background: url('/img/login.png') center no-repeat;
  background-size: cover;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1.5s;

  @media screen and (max-width: 980px) {
    width: 100%;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.9) -10%,
        rgba(255, 255, 255, 0.9) 180%
      ),
      url('/img/login.png');
    background-size: cover;
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  img {
    max-width: 28rem;

    @media screen and (max-width: 480px) {
      max-width: 18rem;
    }
  }

  h1 {
    font-size: 2.4rem;
    color: #374557;
    font-weight: 500;
    line-height: 3.2rem;
    text-align: center;
    padding: 4rem 0;

    @media screen and (max-width: 320px) {
      font-size: 2rem;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

export const TextFieldStyles = {
  width: '100%',
  maxWidth: '51.8rem',
  label: { fontSize: '1.6rem' },
  input: { fontSize: '1.6rem' },
  '& .MuiOutlinedInput-root': { fontSize: '1.6rem' },
  '& p': { fontSize: '1.2rem' },
};

export const ButtonStyles = {
  width: '100%',
  maxWidth: '51.8rem',
  height: '5rem',
  fontSize: '2rem',
  fontWeight: '500',
};

export const AlertStyles = {
  fontSize: '1.6rem',
  width: '100%',
  maxWidth: '51.8rem',
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
};
