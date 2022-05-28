import { AuthProvider } from 'hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

import GlobalStyles from './styles/global';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
