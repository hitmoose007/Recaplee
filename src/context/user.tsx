import { createContext, useContext } from 'react';
import { User } from '@/types/my-types';

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({
  user: {
  },
  setUser: () => {},
});

const useUserContext = (): UserContextType  => useContext(UserContext);

export { UserContext, useUserContext };
