import { deleteUser, findAll, save, update } from './UserService';
import Http from './Http';
import { vitest } from 'vitest';

vitest.mock('./Http');

describe('User Service', () => {
  describe('findAll', () => {
    const mockedGet = vitest.mocked(Http.get);
    it('should get users', () => {
      mockedGet.mockImplementation(() => new Promise(vitest.fn()));

      findAll();

      expect(Http.get).toHaveBeenCalledWith('/users');
    });
    it('should resolve users', async () => {
      const users = [{ id: '1', name: 'User 1' }];
      mockedGet.mockResolvedValue({ data: users });

      await expect(findAll()).resolves.toBe(users);
    });
  });
  describe('save', () => {
    const mockedPost = vitest.mocked(Http.post);
    it('should post user', () => {
      mockedPost.mockImplementation(() => new Promise(vitest.fn()));

      save({ name: 'User 1' });

      expect(Http.post).toHaveBeenCalledWith('/users', { name: 'User 1' });
    });
    it('should resolve user', async () => {
      const user = { id: '1', name: 'User 1' };
      mockedPost.mockResolvedValue({ data: user });

      await expect(save({ name: 'User 1' })).resolves.toBe(user);
    });
  });
  describe('update', () => {
    const mockedPatch = vitest.mocked(Http.patch);
    it('should patch user', () => {
      const user = { id: '1', name: 'User 1' };
      mockedPatch.mockImplementation(() => new Promise(vitest.fn()));

      update(user);

      expect(Http.patch).toHaveBeenCalledWith('/users/1', user);
    });
    it('should resolve user', async () => {
      const user = { id: '1', name: 'User 1' };
      mockedPatch.mockResolvedValue({ data: user });

      await expect(update(user)).resolves.toBe(user);
    });
  });
  describe('delete', () => {
    const mockedDelete = vitest.mocked(Http.delete);
    it('should delete user', () => {
      const user = { id: '1', name: 'User 1' };
      mockedDelete.mockImplementation(() => new Promise(vitest.fn()));

      deleteUser(user);

      expect(Http.delete).toHaveBeenCalledWith('/users/1');
    });
  });
});
