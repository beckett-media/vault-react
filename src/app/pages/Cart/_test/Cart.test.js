import React from 'react';
import ReactDOM from 'react-dom/client';
import Cart from '../Cart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<Cart />);
});