import ReactToastifyCSS from 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${ReactToastifyCSS}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 100;
  }

  body {
    font-size: 1.6rem;
  }

    html {
      font-size: 62.5%;
    }
`;

export default GlobalStyles;
