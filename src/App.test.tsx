import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('Renders project name.', () => {
	render(<App />);
	const headerElement = screen.getByText(/wizard passport/i);
	expect(headerElement).toBeInTheDocument();
});
