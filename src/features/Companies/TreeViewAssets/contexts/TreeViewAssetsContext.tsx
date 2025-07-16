/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

type TreeViewAssetsContextProps = {
  handleRefetchData: () => Promise<void>;
};

type TreeViewAssetsProviderProps = {
  children: React.ReactNode;
};

export const TreeViewAssetsContext = createContext(
  {} as TreeViewAssetsContextProps
);

export const TreeViewAssetsProvider = ({
  children,
}: TreeViewAssetsProviderProps) => {
  return (
    <TreeViewAssetsContext.Provider
      value={{
        handleRefetchData: async () => {
          console.log("Refetching...");
        },
      }}
    >
      {children}
    </TreeViewAssetsContext.Provider>
  );
};

export const useTreeViewAssetsFormContext = () => {
  return useContext(TreeViewAssetsContext);
};
