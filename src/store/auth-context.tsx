import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

export const AuthContextProvider: React.FC<{ children: any }> = (
  props: any
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = (): void => {
    setIsLoggedIn(false);
  };

  const loginHandler = (): void => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
