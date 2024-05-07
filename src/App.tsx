import { useEffect, useState } from 'react';
import './App.css';
import { deleteUser, findAll, save, update } from './UserService';
import PersistedUser from './PersistedUser';

function App() {
  const [users, setUsers] = useState<PersistedUser[]>();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await findAll());
    };
    fetchUsers();
  }, []);

  const createUser = () => {
    setName('');
    save({ name }).then((newUser) => setUsers(users ? [...users, newUser] : [newUser]));
  };

  const updateUser = (user: PersistedUser) => {
    update({ ...user, name }).then((updatedUser) => setUsers(users?.map((currentUser) => (currentUser === user ? updatedUser : currentUser))));
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => updateUser(user)}>Update</button>
              <button onClick={() => deleteUser(user).then(() => setUsers(users?.filter((currentUser) => currentUser !== user)))}>Delete</button>
            </li>
          ))}
      </ul>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={createUser}>Create</button>
    </>
  );
}

export default App;
