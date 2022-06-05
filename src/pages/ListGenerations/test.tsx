import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from 'services/api';

import ListGenerations from '.';
import { renderWithRoute } from '../../utils/tests/helpers';
import {
  generationMock,
  generationsMock,
  generationsWithPageMock,
} from './__mocks__/ListGeneration';

describe('<ListGenerations />', () => {
  it('should render the main', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(jest.fn());
    const { container } = renderWithRoute(<ListGenerations />);
    await waitFor(() => {
      expect(screen.getByText('Nova Geração')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
  it('should render alert when there are no generation', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { generations: [] } });

    renderWithRoute(<ListGenerations />);

    await waitFor(() => {
      expect(
        screen.queryByText('Nenhuma geração cadastrada'),
      ).toBeInTheDocument();
    });
  });
  it('should render alert when get generations fails', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    renderWithRoute(<ListGenerations />);

    await waitFor(() => {
      expect(
        screen.queryByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });
  it('should remove generation desktop when click remove button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    jest.spyOn(api, 'delete').mockResolvedValue(jest.fn());

    renderWithRoute(<ListGenerations />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Remover',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });
  it('should remove generation mobile when click remove button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    jest.spyOn(api, 'delete').mockResolvedValue(jest.fn());

    renderWithRoute(<ListGenerations />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    userEvent.click(screen.getByTestId('DeleteIcon'));

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });
  it('should go to page 2 when click page button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsWithPageMock });

    renderWithRoute(<ListGenerations />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    userEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });
  it('should render error toast on remove generation error', async () => {
    jest.useFakeTimers();

    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    jest.spyOn(api, 'delete').mockRejectedValue({ status: 500 });

    renderWithRoute(
      <div>
        <ToastContainer />
        <ListGenerations />
      </div>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Remover',
      }),
    );

    await waitFor(() => {
      expect(screen.queryAllByText('Removendo...')).toHaveLength(2);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });
  it('should render add generation modal when click button and render error inputs when click to register', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { generations: [] } });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma geração cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Geração',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Geração');
    });

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      screen.getByText('A geração é obrigatória');
    });
  });
  it('should render add generation modal when click button and add new generation', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { generations: [] } });
    jest.spyOn(api, 'post').mockResolvedValue(jest.fn());

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma geração cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Geração',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Geração');
    });

    userEvent.type(screen.getByLabelText('Data'), '04/06/2022');
    userEvent.type(screen.getByLabelText('Geração (kW)'), '150');

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      expect(screen.queryByText('Cadastro de Geração')).toBeNull();
    });
  });
  it('should render add generation modal when click button and render alert', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { generations: [] } });
    jest.spyOn(api, 'post').mockRejectedValue({ status: 500 });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma geração cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Geração',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Geração');
    });

    userEvent.type(screen.getByLabelText('Geração (kW)'), '150');

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      expect(
        screen.getByText('Erro! Tente novamente mais tarde.'),
      ).toBeInTheDocument();
    });
  });
  it('should render add generation modal when click button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { generations: [] } });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma geração cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Geração',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Geração');
    });
  });
  it('should render update generations modal when click edit button desktop', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('Edição de Geração')).toBeInTheDocument();
    });
  });
  it('should render update generation modal when click edit button and render input errors', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('Edição de Geração')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      screen.getByText('A geração é obrigatória');
    });
  });
  it('should render update generation modal when click edit button and update generation', async () => {
    jest.spyOn(api, 'get').mockImplementation(url => {
      if (url === '/plant/1/generation/1') {
        return Promise.resolve({ data: generationMock });
      }
      return Promise.resolve({ data: generationsMock });
    });
    jest.spyOn(api, 'put').mockResolvedValue(jest.fn());

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('Edição de Geração')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      expect(screen.queryByText('Edição de Geração')).toBeNull();
    });
  });
  it('should render update generation modal when click edit button and render alert on error', async () => {
    jest.spyOn(api, 'get').mockImplementation(url => {
      if (url === '/plant/1/generation/1') {
        return Promise.resolve({ data: generationMock });
      }
      return Promise.resolve({ data: generationsMock });
    });
    jest.spyOn(api, 'put').mockRejectedValue({ status: 500 });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('Edição de Geração')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      expect(
        screen.getByText('Erro! Tente novamente mais tarde.'),
      ).toBeInTheDocument();
    });
  });
  it('should render update generation modal when click edit button mobile', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: generationsMock });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('EditIcon'));

    await waitFor(() => {
      expect(screen.getByText('Edição de Geração')).toBeInTheDocument();
    });
  });
  it('should search generations', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({
      data: generationsMock,
    });

    const history = createMemoryHistory();
    history.push(`/generations`, {
      id: 1,
      plantName: 'Planta 1',
      active: true,
    });

    renderWithRoute(
      <Router history={history}>
        <ListGenerations />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText('Data Inicial'), '04/05/2022');
    userEvent.type(screen.getByLabelText('Data Final'), '05/06/2022');

    userEvent.click(screen.getByText('Pesquisar'));

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });
});
