import { render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });
  it('should have button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should initialise count to zero', async () => {
    expect(screen.getByRole('button', { name: 'count is 0' })).toBeInTheDocument();
  });
  it('should increment count on click', async () => {
    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('count is 2');
  });
});
