import React from 'react';
import ReactDOM from 'react-dom/client';
import SignIn from '../SignIn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<SignIn />);
});