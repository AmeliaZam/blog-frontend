import {
  render, screen, waitFor, act,
} from '@testing-library/react'

import Articles from 'container/articles'
import { TestApp } from 'utils/test'

describe('Articles Container', () => {
  beforeEach(() => act(() => render(<Articles />, { wrapper: TestApp })))

  it('should render correctly', () => {
    expect.assertions(1)
    expect(screen).toMatchSnapshot()
  })

  it('should have heading', async () => {
    await waitFor(() => {
      expect(screen.getAllByText('Publish Articles').length).toBe(1)
    })
  })

  it('should have 1 button with text "Published Articles"', async () => {
    await waitFor(() => {
      expect(screen.getAllByText('Published Articles').length).toBe(1)
    })
  })
 
  it('should have 1 button with text "Draft Articles"', async () => {
    await waitFor(() => {
      expect(screen.getAllByText('Draft Articles').length).toBe(1)
    })
  })
  it('should have 1 button with text "+ Add Article"', async () => {
    await waitFor(() => {
      expect(screen.getAllByText('+ Add Article').length).toBe(1)
    })
  })
})
