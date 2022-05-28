import NotFound from '.';
import { renderWithRoute } from '../../utils/tests/helpers';

describe('<NotFound />', () => {
  it('should render the main', () => {
    const { container } = renderWithRoute(<NotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
