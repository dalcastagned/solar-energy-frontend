import { AuthProvider } from 'hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from 'routes';

import GlobalStyles from './styles/global';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ToastContainer />
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
