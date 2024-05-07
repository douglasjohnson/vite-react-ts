import User from './User';
import Http from './Http';
import PersistedUser from './PersistedUser';

const findAll = () => Http.get<PersistedUser[]>('/users').then((response) => response.data);
const save = (user: User) => Http.post<PersistedUser>('/users', user).then((response) => response.data);
const update = (user: PersistedUser) => Http.patch<PersistedUser>(`/users/${user.id}`, user).then((response) => response.data);
const deleteUser = (user: PersistedUser) => Http.delete(`/users/${user.id}`);

export { findAll, save, update, deleteUser };
