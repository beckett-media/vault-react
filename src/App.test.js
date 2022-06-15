import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Homepage from './App'
import { store } from './app/state/store/store'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Homepage />
    </Provider>,
  )

  expect(getByText(/collectibles/i)).toBeInTheDocument()
})
