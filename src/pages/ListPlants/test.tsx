import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from 'services/api';

import ListPlants from '.';
import { renderWithRoute } from '../../utils/tests/helpers';
import { plantsMock, plantsWithPageMock } from './__mocks__/ListPlant';

describe('<ListPlants />', () => {
  it('should render the main', async () => {
    const { container } = renderWithRoute(<ListPlants />);
    await waitFor(() => {
      expect(screen.getByText('Nova Unidade')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
  it('should render alert when there are no plants', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });

    renderWithRoute(<ListPlants />);
    await waitFor(() => {
      expect(
        screen.queryByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });
  });
  it('should render alert when get plants fails', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    renderWithRoute(<ListPlants />);
    await waitFor(() => {
      expect(
        screen.queryByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });
  it('should search plants', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({
      data: plantsMock,
    });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      userEvent.type(
        screen.getByPlaceholderText('Apelido, Local, Marca, Modelo'),
        'Nome Qualquer',
      );
    });

    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });

    act(() => {
      userEvent.click(screen.getByText('Pesquisar'));
    });

    waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });
  });
  it('should go to update plant page desktop when click edit button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    const history = createMemoryHistory();
    const historyMock = jest.spyOn(history, 'push');

    renderWithRoute(
      <Router history={history}>
        <ListPlants />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'Editar',
        }),
      );

      await waitFor(() => {
        expect(historyMock).toBeCalledWith('/plants/update', { id: 1 });
      });
    });
  });
  it('should go to update plant page mobile when click edit button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    const history = createMemoryHistory();
    const historyMock = jest.spyOn(history, 'push');

    renderWithRoute(
      <Router history={history}>
        <ListPlants />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('EditIcon'));

      await waitFor(() => {
        expect(historyMock).toBeCalledWith('/plants/update', { id: 1 });
      });
    });
  });
  it('should go to add plant page when click edit button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });

    const history = createMemoryHistory();
    const historyMock = jest.spyOn(history, 'push');

    renderWithRoute(
      <Router history={history}>
        <ListPlants />
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'Nova Unidade',
        }),
      );

      await waitFor(() => {
        expect(historyMock).toBeCalledWith('/plants/add');
      });
    });
  });
  it('should remove plant desktop when click remove button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    jest.spyOn(api, 'delete').mockResolvedValue(jest.fn());

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    await act(async () => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'Remover',
        }),
      );

      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
      });
    });
  });
  it('should remove plant mobile when click remove button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    jest.spyOn(api, 'delete').mockResolvedValue(jest.fn());

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    await act(async () => {
      userEvent.click(screen.getByTestId('DeleteIcon'));

      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
      });
    });
  });
  it('should go to page 2 when click page button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsWithPageMock });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    await act(async () => {
      userEvent.click(screen.getByText('2'));

      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
      });
    });
  });
  it('should render error toast on remove plant error', async () => {
    jest.useFakeTimers();

    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    jest.spyOn(api, 'delete').mockRejectedValue({ status: 500 });

    renderWithRoute(
      <div>
        <ToastContainer />
        <ListPlants />
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
});
