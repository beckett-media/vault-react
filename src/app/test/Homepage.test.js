import { render, screen } from '@testing-library/react'
import Homepage from '../components/Homepage/Homepage'

test('renders learn react link', () => {
  render(<Homepage />)
  console.log(screen)
  //   const linkElement = screen.getByText();
  //   expect(linkElement).toBeInTheDocument();
})
