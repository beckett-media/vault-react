import React from 'react';
import ReactDOM from 'react-dom/client';
import Department from '../Department';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<Department />);
});
