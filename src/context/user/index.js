import { createContext } from "react";
import * as React from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = React.useState("");

  const UserObj = {
    userInfo,
    setUserInfo,
  };

  return (
    <UserContext.Provider value={UserObj}>{children}</UserContext.Provider>
  );
};

// SearchProvider.propTypes = {
//   children: node.isRequired,
// };

export default UserProvider;
