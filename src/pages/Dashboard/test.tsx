import { screen, waitFor } from '@testing-library/react';
import api from 'services/api';

import Dashboard from '.';
import { renderWithRoute } from '../../utils/tests/helpers';
import { counts, monthsGenerations } from './__mocks__/Dashboard';

describe('<Dashboard />', () => {
  it('should render the main', async () => {
    jest.spyOn(api, 'get').mockImplementation(url => {
      if (url === '/plant/counts') {
        return Promise.resolve({ data: counts });
      }
      return Promise.resolve({ data: monthsGenerations });
    });
    const { container } = renderWithRoute(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Total de Unidades')).toBeInTheDocument();
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render alert', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ status: 500 });

    renderWithRoute(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'O servidor parece estar indisponível. Verifique sua conexão.',
        ),
      ).toBeInTheDocument();
    });
  });
});
