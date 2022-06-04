import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from 'hooks/auth';
import { userMock } from 'hooks/auth/__mocks__';

import Layout from '.';
import { renderWithRoute } from '../../utils/tests/helpers';

describe('<Layout />', () => {
  it('should render the main', () => {
    const { container } = renderWithRoute(<Layout />);

    expect(container.firstChild).toMatchSnapshot();
  });
  it('should remove the user data from local storage when user sign out', async () => {
    localStorage.setItem('user', JSON.stringify(userMock));

    renderWithRoute(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
    );

    const buttonProfile = screen.getByText('T');

    userEvent.click(buttonProfile);

    await waitFor(() => {
      const signOutButton = screen.getByText('Logout');

      userEvent.click(signOutButton);

      expect(localStorage.getItem('user')).toEqual(null);
    });
  });
  it('should remove the user data from local storage when user sign out', async () => {
    localStorage.setItem('user', JSON.stringify(userMock));

    renderWithRoute(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
    );

    const buttonProfile = screen.getByText('T');

    userEvent.click(buttonProfile);

    await waitFor(() => {
      const signOutButton = screen.getByText('Logout');

      userEvent.click(signOutButton);

      expect(localStorage.getItem('user')).toEqual(null);
    });
  });
  it('should open and close Drawer', async () => {
    renderWithRoute(
      <AuthProvider>
        <Layout />
      </AuthProvider>,
    );

    userEvent.click(screen.getByTestId('MenuIcon'));

    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();

    userEvent.click(
      screen.getByRole('button', { name: 'Unidade Consumidora' }),
    );

    userEvent.click(screen.getByTestId('ChevronLeftIcon'));

    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });
});
