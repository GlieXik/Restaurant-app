import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const LikedContext = createContext({});
export const LikedContextProvider = ({ children }) => {
  const [selectedLikes, setSelectedLikes] = useLocalStorageState("liked", {
    defaultValue: [],
  });
  console.log("====================================");
  console.log(selectedLikes);
  console.log("====================================");
  return (
    <>
      <LikedContext.Provider value={{ selectedLikes, setSelectedLikes }}>
        {children}
      </LikedContext.Provider>
    </>
  );
};
