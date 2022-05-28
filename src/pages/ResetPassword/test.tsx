import {
  act,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ResetPassword from '.';
import Login from '.';
import { AuthProvider } from '../../hooks/auth';
import Route from '../../routes/Route';
import api from '../../services/api';
import { renderWithRoute } from '../../utils/tests/helpers';

describe('<ResetPassword />', () => {
  it('should render the main', () => {
    const { container } = renderWithRoute(<ResetPassword />);

    expect(screen.getByText('Alterar senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha atual')).toBeInTheDocument();
    expect(screen.getByLabelText('Nova senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar nova senha')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the validation messages when update passowd without currentPassword, newPassord and confirmNewPassword', async () => {
    renderWithRoute(<ResetPassword />);

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      expect(
        screen.getByText('A senha atual é obrigatória.'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('A senha nova é obrigatória.'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('A confirmação de senha é obrigatória.'),
      ).toBeInTheDocument();
    });
  });

  it('must render validation messages when currentPassword, newPassord and confirmNewPassword contain more than 60 characters', async () => {
    renderWithRoute(<Login />);

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, Array(61).fill('a').join(''));

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, Array(61).fill('a').join(''));

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, Array(61).fill('a').join(''));

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      const [
        currentPasswordValidation,
        newPasswordValidation,
        confirmNewPasswordValidation,
      ] = screen.getAllByText('Máximo de 60 caracteres');
      expect(currentPasswordValidation).toBeInTheDocument();
      expect(newPasswordValidation).toBeInTheDocument();
      expect(confirmNewPasswordValidation).toBeInTheDocument();
    });
  });

  it('should render alert when current password is not correct', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ response: { status: 400 } });

    const history = createMemoryHistory();
    history.push(`/reset-password`, { email: 'email@email.com' });

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <ResetPassword />
        </Router>
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanova');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Senha atual incorreta.')).toBeInTheDocument();
    });
  });

  it('should render alert when server is down', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ code: 'ECONNABORTED' });

    const history = createMemoryHistory();
    history.push(`/reset-password`, { email: 'email@email.com' });

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <ResetPassword />
        </Router>
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanova');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(async () => {
      expect(
        screen.getByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should render alert with server error message', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ response: { status: 500 } });

    const history = createMemoryHistory();
    history.push(`/reset-password`, { email: 'email@email.com' });

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <ResetPassword />
        </Router>
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanova');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro no servidor.'),
      ).toBeInTheDocument();
    });
  });

  it('should close alert when clicked on closeButton', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ response: undefined });

    const history = createMemoryHistory();
    history.push(`/reset-password`, { email: 'email@email.com' });

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <ResetPassword />
        </Router>
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanova');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      const closeAlert = screen.getByLabelText('Close');
      userEvent.click(closeAlert);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('should render alert when password confirmation is different from new password', async () => {
    renderWithRoute(
      <AuthProvider>
        <ResetPassword />
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanov');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    userEvent.click(updatePasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Senhas não correspondem')).toBeInTheDocument();
    });
  });

  it('should go to login screen when password change is successful', async () => {
    jest.spyOn(api, 'post').mockImplementation(jest.fn());

    const history = createMemoryHistory();
    history.push(`/reset-password`, { email: 'email@email.com' });

    const loginPage = (): JSX.Element => <h1>Login</h1>;

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <ResetPassword />
          <Route Component={loginPage} path="/" />
        </Router>
      </AuthProvider>,
    );

    const currentPasswordInput = screen.getByLabelText('Senha atual');
    userEvent.type(currentPasswordInput, 'senha1');

    const newPasswordInput = screen.getByLabelText('Nova senha');
    userEvent.type(newPasswordInput, 'senhanova');

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirmar nova senha',
    );
    userEvent.type(confirmNewPasswordInput, 'senhanova');

    const updatePasswordButton = screen.getByRole('button', {
      name: 'Alterar senha',
    });

    await act(async () => {
      userEvent.click(updatePasswordButton);

      await waitFor(() => {
        expect(screen.getByText('Login')).toBeInTheDocument();
      });
    });
  });
});
