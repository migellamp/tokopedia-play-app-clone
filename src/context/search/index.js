import { createContext } from "react";
import * as React from "react";

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [typeValue, setTypeValue] = React.useState("");

  const searchObj = {
    typeValue,
    setTypeValue,
  };

  return (
    <SearchContext.Provider value={searchObj}>
      {children}
    </SearchContext.Provider>
  );
};

// SearchProvider.propTypes = {
//   children: node.isRequired,
// };

export default SearchProvider;
