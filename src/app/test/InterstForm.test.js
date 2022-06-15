import { render, screen } from '@testing-library/react';
import InterestForm from '../components/Homepage/InterestForm';

test('renders learn react link', () => {
  render(<InterestForm />);
  console.log(screen)
//   const linkElement = screen.getByText();
//   expect(linkElement).toBeInTheDocument();
});