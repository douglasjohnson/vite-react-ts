import User from './User';
import Http from './Http';

const findAll = () => Http.get<User[]>('/users').then((response) => response.data);
const save = (user: User) => Http.post<User>('/users', user).then((response) => response.data);
const update = (user: User) => Http.patch<User>(`/users/${user.id}`, user).then((response) => response.data);
const deleteUser = (user: User) => Http.delete(`/users/${user.id}`);

export { findAll, save, update, deleteUser };
