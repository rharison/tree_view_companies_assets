import { treeDataMock } from "@src/commons/mocks/treeData";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { createContext, useContext, useState } from "react";

type AssetsContextProps = {
  selectTreeItem: TreeItem | null;
  treeData: TreeItem[];
  handleSelectTreeItem: (item: TreeItem) => void;
};

type AssetsProviderProps = {
  children: React.ReactNode;
};

const AssetsContext = createContext<AssetsContextProps | null>(null);

export function AssetsProvider({ children }: AssetsProviderProps) {
  const [selectTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);

  function handleSelectTreeItem(item: TreeItem) {
    if (selectTreeItem?.id === item.id) {
      setSelectedTreeItem(null);
      return;
    }
    setSelectedTreeItem(item);
  }

  return (
    <AssetsContext.Provider
      value={{
        treeData: treeDataMock,
        selectTreeItem,
        handleSelectTreeItem,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);

  if (!context) {
    throw new Error("useAssetsContext must be used within a AssetsProvider");
  }

  return context;
};
