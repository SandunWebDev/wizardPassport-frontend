import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders project name.', () => {
  render(<App />);
  const headerElement = screen.getByText(/Wizard Passport/i);
  expect(headerElement).toBeInTheDocument();
});
