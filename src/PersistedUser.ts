import User from './User';

type PersistedUser = {
  id: string;
} & User;

export default PersistedUser;
