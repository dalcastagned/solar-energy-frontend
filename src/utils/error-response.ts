export type Error = {
  status?: number;
  data?: Record<string, unknown>;
  message?: string;
};

export type ErrorResponse = {
  response: Error;
  code: string;
};

export const handleErrorResponse = (
  err: unknown,
  location?: string,
): string => {
  const error = err as ErrorResponse;
  if (!error.response || error.code === 'ECONNABORTED') {
    return 'O servidor parece estar indisponível. Verifique sua conexão.';
  }

  const { status } = error.response;

  if (location === '/reset-password' && status === 400) {
    return 'Senha atual incorreta.';
  }

  switch (status) {
    case 401:
      return 'Usuário ou senha inválidos.';

    default:
      return 'Ocorreu um erro no servidor.';
  }
};
