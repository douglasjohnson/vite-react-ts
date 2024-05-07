import { act, render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import App from './App';
import { vitest } from 'vitest';
import { findAll, save } from './UserService';

vitest.mock('./UserService');
const mockedFindAll = vitest.mocked(findAll);
const mockedSave = vitest.mocked(save);

describe('App', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });
  it('should load users', async () => {
    mockedFindAll.mockResolvedValue([]);

    await act(() => render(<App />));

    expect(mockedFindAll).toHaveBeenCalledOnce();
  });
  it('should display all users', async () => {
    mockedFindAll.mockResolvedValue([
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ]);

    await act(() => render(<App />));

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });
  it('should save new user', async () => {
    mockedSave.mockImplementation(() => new Promise(vi.fn()));
    mockedFindAll.mockResolvedValue([
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ]);
    await act(() => render(<App />));

    await user.type(screen.getByRole('textbox'), 'User 3');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(mockedSave).toHaveBeenCalledWith({ name: 'User 3' });
  });
  it('should display new user', async () => {
    mockedSave.mockResolvedValue({ id: '3', name: 'User 3' });
    mockedFindAll.mockResolvedValue([
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ]);
    await act(() => render(<App />));

    await user.type(screen.getByRole('textbox'), 'User 3');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('User 3')).toBeInTheDocument();
  });
});
