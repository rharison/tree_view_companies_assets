import { treeDataMock } from "@commons/mocks/treeData";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useState } from "react";

export const useAssetsViewController = () => {
  const [selectTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);

  function handleSelectTreeItem(item: TreeItem) {
    if (selectTreeItem?.id === item.id) {
      setSelectedTreeItem(null);
      return;
    }
    setSelectedTreeItem(item);
  }

  return { treeData: treeDataMock, selectTreeItem, handleSelectTreeItem };
};
