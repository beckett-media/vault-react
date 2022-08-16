import React from 'react';
import ReactDOM from 'react-dom/client';
import InterestForm from '../InterestForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<InterestForm />);
});