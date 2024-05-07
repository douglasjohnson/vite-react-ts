import { act, render, screen } from '@testing-library/react';
import { userEvent, UserEvent } from '@testing-library/user-event';
import App from './App';
import { vitest } from 'vitest';
import { findAll, save, deleteUser, update } from './UserService';

vitest.mock('./UserService');
const mockedFindAll = vitest.mocked(findAll);
const mockedSave = vitest.mocked(save);
const mockedDelete = vitest.mocked(deleteUser);
const mockedUpdate = vitest.mocked(update);

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
  it('should delete user', async () => {
    mockedDelete.mockImplementation(() => new Promise(vi.fn()));
    mockedFindAll.mockResolvedValue([{ id: '1', name: 'User 1' }]);
    await act(() => render(<App />));

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(mockedDelete).toHaveBeenCalledWith({ id: '1', name: 'User 1' });
  });
  it('should remove deleted user', async () => {
    mockedDelete.mockResolvedValue(undefined);
    mockedFindAll.mockResolvedValue([{ id: '1', name: 'User 1' }]);
    await act(() => render(<App />));

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('User 3')).not.toBeInTheDocument();
  });
  it('should update user', async () => {
    mockedUpdate.mockImplementation(() => new Promise(vi.fn()));
    mockedFindAll.mockResolvedValue([{ id: '1', name: 'User 1' }]);
    await act(() => render(<App />));

    await user.type(screen.getByRole('textbox'), 'Updated User');
    await user.click(screen.getByRole('button', { name: 'Update' }));

    expect(mockedUpdate).toHaveBeenCalledWith({ id: '1', name: 'Updated User' });
  });
  it('should display updated user', async () => {
    mockedUpdate.mockResolvedValue({ id: '1', name: 'Updated User' });
    mockedFindAll.mockResolvedValue([
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ]);
    await act(() => render(<App />));

    await user.type(screen.getByRole('textbox'), 'Updated User');
    await user.click(screen.getAllByRole('button', { name: 'Update' })[0]);

    expect(screen.getByText('Updated User')).toBeInTheDocument();
  });
});
