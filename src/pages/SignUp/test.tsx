import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import SignUp from '.';
import Login from '.';
import { AuthProvider } from '../../hooks/auth';
import Route from '../../routes/Route';
import api from '../../services/api';
import { renderWithRoute } from '../../utils/tests/helpers';

describe('<SignUp />', () => {
  it('should render the main', () => {
    const { container } = renderWithRoute(<SignUp />);

    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the validation messages when sign up without email, passord and confirmPassword', async () => {
    renderWithRoute(<SignUp />);

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('A senha é obrigatória.')).toBeInTheDocument();
      expect(
        screen.getByText('A confirmação de senha é obrigatória.'),
      ).toBeInTheDocument();
    });
  });

  it('must render validation messages when passord and confirmPassword contain more than 60 characters', async () => {
    renderWithRoute(<Login />);

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, Array(61).fill('a').join(''));

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, Array(61).fill('a').join(''));

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      const [passwordValidation, confirmPasswordValidation] =
        screen.getAllByText('Máximo de 60 caracteres');
      expect(passwordValidation).toBeInTheDocument();
      expect(confirmPasswordValidation).toBeInTheDocument();
    });
  });

  it('should render alert when user already exist', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ response: { status: 400 } });

    const history = createMemoryHistory();
    history.push(`/signup`);

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <SignUp />
        </Router>
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha1');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText('Usuário já cadastrado.')).toBeInTheDocument();
    });
  });

  it('should render alert when server is down', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ code: 'ECONNABORTED' });

    const history = createMemoryHistory();
    history.push(`/signup`);

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <SignUp />
        </Router>
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha1');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

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
    history.push(`/signup`);

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <SignUp />
        </Router>
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha1');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro no servidor.'),
      ).toBeInTheDocument();
    });
  });

  it('should close alert when clicked on closeButton', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ response: undefined });

    const history = createMemoryHistory();
    history.push(`/signup`);

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <SignUp />
        </Router>
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha1');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      const closeAlert = screen.getByLabelText('Close');
      userEvent.click(closeAlert);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('should render alert when password confirmation is different from password', async () => {

    renderWithRoute(
      <AuthProvider>
        <SignUp />
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha2');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    userEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText('Senhas não correspondem')).toBeInTheDocument();
    });
  });

  it('should go to login screen when sign up successful', async () => {
    jest.spyOn(api, 'post').mockImplementation(jest.fn());

    const history = createMemoryHistory();
    history.push(`/signup`);

    const loginPage = (): JSX.Element => <h1>Login</h1>;

    renderWithRoute(
      <AuthProvider>
        <Router history={history}>
          <SignUp />
          <Route Component={loginPage} path="/" />
        </Router>
      </AuthProvider>,
    );

    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'usuario@usuario.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'senha1');

    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    userEvent.type(confirmPasswordInput, 'senha1');

    const signUpButton = screen.getByRole('button', {
      name: 'Cadastrar',
    });

    await act(async () => {
      userEvent.click(signUpButton);

      await waitFor(() => {
        expect(screen.getByText('Login')).toBeInTheDocument();
      });
    });
  });
});
