import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '.';
import { AuthProvider } from '../../hooks/auth';
import Route from '../../routes/Route';
import api from '../../services/api';
import { renderWithRoute } from '../../utils/tests/helpers';

describe('<Login />', () => {
  it('should render the main', () => {
    const { container } = renderWithRoute(<Login />);
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the validation messages when login without username and password', async () => {
    renderWithRoute(<Login />);

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    });
  });

  it('must render validation messages when password contain more than 60 characters', async () => {
    renderWithRoute(<Login />);

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, Array(61).fill('a').join(''));

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Máximo de 60 caracteres')).toBeInTheDocument();
    });
  });

  it('should render alert when user is not authorized', async () => {
    jest.spyOn(api, 'post').mockImplementation(async () => {
      const error = { response: { status: 401 } };
      throw error;
    });

    renderWithRoute(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const userInput = screen.getByLabelText('Email');
    userEvent.type(userInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText('Usuário ou senha inválidos.'),
      ).toBeInTheDocument();
    });
  });

  it('should render alert when Password Expired', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({
      response: { status: 401, data: 'Password expired' },
    });

    const resetPage = (): JSX.Element => <h1>Alterar senha</h1>;

    renderWithRoute(
      <AuthProvider>
        <Route Component={Login} />
        <Route Component={resetPage} path="/reset-password" />
      </AuthProvider>,
    );

    const userInput = screen.getByLabelText('Email');
    userEvent.type(userInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Alterar senha')).toBeInTheDocument();
    });
  });

  it('should render alert when server is down', async () => {
    jest.spyOn(api, 'post').mockImplementation(async () => {
      const error = { code: 'ECONNABORTED' };
      throw error;
    });

    renderWithRoute(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const userInput = screen.getByLabelText('Email');
    userEvent.type(userInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.click(loginButton);

    await waitFor(async () => {
      expect(
        screen.getByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should render alert with server error message', async () => {
    jest.spyOn(api, 'post').mockImplementation(async () => {
      const error = { response: { status: 500 } };
      throw error;
    });

    renderWithRoute(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const userInput = screen.getByLabelText('Email');
    userEvent.type(userInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro no servidor.'),
      ).toBeInTheDocument();
    });
  });

  it('should close alert when clicked on closeButton', async () => {
    jest.spyOn(api, 'post').mockImplementation(async () => {
      const error = { response: undefined };
      throw error;
    });

    renderWithRoute(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const userInput = screen.getByLabelText('Email');
    userEvent.type(userInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByText('Entrar');

    userEvent.click(loginButton);

    await waitFor(() => {
      const closeAlert = screen.getByLabelText('Close');
      userEvent.click(closeAlert);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
