import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from 'react-router-dom';
import { renderWithRoute } from 'utils/tests/helpers';

import { AuthProvider } from '../hooks/auth';
import { userMock } from '../hooks/auth/__mocks__';
import Route from './Route';

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

    screen.debug();
    expect(screen.getByTestId('container')).toBeEmptyDOMElement();

    userEvent.click(screen.getByTestId('test-page-private-click-here'));

    screen.debug();
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
});
