import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginCredentials } from 'models/user';
import { Link, MemoryRouter } from 'react-router-dom';
import Routes from 'routes';
import api from 'services/api';
import { renderWithRoute } from 'utils/tests/helpers';

import { AuthProvider, cleanStorage, useAuth } from '../hooks/auth';
import { loginRequestMock, userMock } from '../hooks/auth/__mocks__';
import Route from './Route';

const login = async (): Promise<void> => {
  cleanStorage();

  jest.spyOn(api, 'post').mockImplementation(async () => ({ data: userMock }));

  let signIn: (credentials: LoginCredentials) => Promise<void>;

  const App = (): JSX.Element => {
    ({ signIn } = useAuth());
    return <Routes />;
  };

  renderWithRoute(
    <AuthProvider>
      <App />
    </AuthProvider>,
  );

  await act(async () => {
    signIn(loginRequestMock);
  });
};

describe('<Route />', () => {
  it('Checking if the component was redirected', () => {
    const Component = (): JSX.Element => <h1>essa página é privada</h1>;

    renderWithRoute(
      <>
        <div data-testid="container">
          <Route Component={Component} isPrivate path="/page-private" />
        </div>
        <Link to="/page-private" data-testid="test-page-private-click-here" />
      </>,
    );
    expect(screen.getByTestId('container')).toBeEmptyDOMElement();

    userEvent.click(screen.getByTestId('test-page-private-click-here'));
    expect(screen.getByTestId('container')).toBeEmptyDOMElement();
  });

  it('Should be able to access the page if user has the required role', () => {
    localStorage.setItem(
      'user',

      JSON.stringify({ ...userMock, roles: ['admin'] }),
    );

    const Component = (): JSX.Element => <h1>essa página é privada</h1>;

    renderWithRoute(
      <AuthProvider>
        <div data-testid="container">
          <Route
            Component={Component}
            isPrivate
            roles={['admin']}
            path="/page-private"
          />
        </div>

        <Link to="/page-private" data-testid="test-page-private-click-here" />
      </AuthProvider>,
    );

    expect(screen.getByTestId('container')).toBeEmptyDOMElement();

    userEvent.click(screen.getByTestId('test-page-private-click-here'));

    expect(screen.getByText('essa página é privada')).toBeInTheDocument();
  });

  it('Should not be able to access the page if user has the required role', () => {
    localStorage.setItem(
      'user',

      JSON.stringify({ ...userMock, roles: ['admin'] }),
    );

    const Component = (): JSX.Element => <h1>essa página é privada</h1>;

    renderWithRoute(
      <AuthProvider>
        <div data-testid="container">
          <Route
            Component={Component}
            isPrivate
            roles={['user']}
            path="/page-private"
          />
        </div>

        <Link to="/page-private" data-testid="test-page-private-click-here" />
      </AuthProvider>,
    );

    expect(screen.getByTestId('container')).toBeEmptyDOMElement();

    userEvent.click(screen.getByTestId('test-page-private-click-here'));

    expect(screen.getByTestId('container')).toBeEmptyDOMElement();
  });

  it('should remove the user data from local storage when user sign out', async () => {
    localStorage.setItem('user', JSON.stringify(userMock));

    let signOut: () => void;

    const App = (): JSX.Element => {
      ({ signOut } = useAuth());
      return <Routes />;
    };

    renderWithRoute(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    await act(async () => {
      signOut();
    });

    expect(localStorage.getItem('user')).toEqual(null);
  });

  it('should login and set localstorage when user is valid', async () => {
    await login();
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(userMock));
  });
});
