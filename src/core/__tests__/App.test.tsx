import React from 'react';
import { render } from '@testing-library/react';

import { Core } from '../Core';

test('renders learn react link', () => {
  const { getByText } = render(<Core />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
