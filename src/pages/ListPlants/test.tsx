import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from 'services/api';

import ListPlants from '.';
import { renderWithRoute } from '../../utils/tests/helpers';
import {
  plantMock,
  plantsMock,
  plantsWithPageMock,
} from './__mocks__/ListPlant';

describe('<ListPlants />', () => {
  it('should render the main', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(jest.fn());
    const { container } = renderWithRoute(<ListPlants />);
    await waitFor(() => {
      expect(screen.getByText('Nova Unidade')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
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

    userEvent.click(screen.getByText('Pesquisar'));

    waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
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
  it('should render update plant modal when click edit button desktop', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText('Edição de Unidade Geradora'),
      ).toBeInTheDocument();
    });
  });
  it('should render update plant modal when click edit button and render input errors', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText('Edição de Unidade Geradora'),
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      screen.getByText('O apelido é obrigatório');
      screen.getByText('O local é obrigatório');
      screen.getByText('A marca é obrigatória');
      screen.getByText('O modelo é obrigatório');
    });
  });
  it('should render update plant modal when click edit button and update plant', async () => {
    jest.spyOn(api, 'get').mockImplementation(url => {
      if (url === '/plant/1') {
        return Promise.resolve({ data: plantMock });
      }
      return Promise.resolve({ data: plantsMock });
    });
    jest.spyOn(api, 'put').mockResolvedValue(jest.fn());

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText('Edição de Unidade Geradora'),
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      expect(screen.queryByText('Edição de Unidade Geradora')).toBeNull();
    });
  });
  it('should render update plant modal when click edit button and render alert on error', async () => {
    jest.spyOn(api, 'get').mockImplementation(url => {
      if (url === '/plant/1') {
        return Promise.resolve({ data: plantMock });
      }
      return Promise.resolve({ data: plantsMock });
    });
    jest.spyOn(api, 'put').mockRejectedValue({ status: 500 });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Editar',
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText('Edição de Unidade Geradora'),
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Atualizar'));

    await waitFor(() => {
      expect(
        screen.getByText('Erro! Tente novamente mais tarde.'),
      ).toBeInTheDocument();
    });
  });
  it('should render update plant modal when click edit button mobile', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('EditIcon'));

    await waitFor(() => {
      expect(
        screen.getByText('Edição de Unidade Geradora'),
      ).toBeInTheDocument();
    });
  });
  it('should render add plant modal when click button and render error inputs when click to register', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Unidade',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Unidade Geradora');
    });

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      screen.getByText('O apelido é obrigatório');
      screen.getByText('O local é obrigatório');
      screen.getByText('A marca é obrigatória');
      screen.getByText('O modelo é obrigatório');
    });
  });
  it('should render add plant modal when click button and add new plant', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });
    jest.spyOn(api, 'post').mockResolvedValue(jest.fn());

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Unidade',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Unidade Geradora');
    });

    userEvent.type(screen.getByLabelText('Apelido'), 'Nome Qualquer');
    userEvent.type(screen.getByLabelText('Local'), 'Local Qualquer');
    userEvent.type(screen.getByLabelText('Marca'), 'Marca Qualquer');
    userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Qualquer');

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      expect(screen.queryByText('Cadastro de Unidade Geradora')).toBeNull();
    });
  });
  it('should render add plant modal when click button and render alert', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });
    jest.spyOn(api, 'post').mockRejectedValue({ status: 500 });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Unidade',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Unidade Geradora');
    });

    userEvent.type(screen.getByLabelText('Apelido'), 'Nome Qualquer');
    userEvent.type(screen.getByLabelText('Local'), 'Local Qualquer');
    userEvent.type(screen.getByLabelText('Marca'), 'Marca Qualquer');
    userEvent.type(screen.getByLabelText('Modelo'), 'Modelo Qualquer');

    userEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
      expect(
        screen.getByText('Erro! Tente novamente mais tarde.'),
      ).toBeInTheDocument();
    });
  });
  it('should render add plant modal when click button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { plants: [] } });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(
        screen.getByText('Nenhuma unidade cadastrada'),
      ).toBeInTheDocument();
    });

    userEvent.click(
      screen.getByRole('button', {
        name: 'Nova Unidade',
      }),
    );

    await waitFor(() => {
      screen.getByText('Cadastro de Unidade Geradora');
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

    userEvent.click(
      screen.getByRole('button', {
        name: 'Remover',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
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

    userEvent.click(screen.getByTestId('DeleteIcon'));

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });
  it('should go to page 2 when click page button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsWithPageMock });

    renderWithRoute(<ListPlants />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    jest.spyOn(api, 'get').mockResolvedValue({ data: plantsMock });

    userEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
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
  it('should go to generations page on click id button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: '1' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click nickname button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: 'Apelido da planta' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click place button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: 'Local da planta' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click brand button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: 'Marca da planta' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click model button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: 'Modelo da planta' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click active button', async () => {
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

    userEvent.click(screen.getByRole('cell', { name: 'Ativa' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
  it('should go to generations page on click card', async () => {
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

    userEvent.click(screen.getByRole('heading', { name: 'Id:' }));

    await waitFor(() => {
      expect(historyMock).toBeCalledWith('/generations', {
        active: true,
        id: 1,
        plantName: 'Apelido da Planta',
      });
    });
  });
});
