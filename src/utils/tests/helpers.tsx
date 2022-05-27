import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRoute = (
  children: React.ReactNode,
): RenderResult =>
  render(
    <MemoryRouter>
      {children}
    </MemoryRouter>,
  );
