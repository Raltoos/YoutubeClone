/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const UserLoginContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserLoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserLoginContext.Provider value={{ user, setUser }}>
      {children}
    </UserLoginContext.Provider>
  );
};