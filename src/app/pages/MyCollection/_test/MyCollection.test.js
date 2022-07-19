import React from 'react';
import ReactDOM from 'react-dom/client';
import MyCollection from '../MyCollection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<MyCollection />);
});
