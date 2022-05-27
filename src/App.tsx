import { AuthProvider } from 'hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
