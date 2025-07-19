import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useAssetsContext } from "@src/features/Companies/pages/Assets/contexts/AssetsContext";
import { useState } from "react";

export const useTreeAssetsNodeController = (item: TreeItem) => {
  const [open, setOpen] = useState(false);
  const { handleSelectTreeItem, selectTreeItem } = useAssetsContext();

  function checkHasChildren(item: TreeItem) {
    return item.children && item.children.length > 0;
  }

  function checkIsSelectable(item: TreeItem) {
    return Boolean(item.sensorType) && !checkHasChildren(item);
  }

  function toggleOpen() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClickTreeItem(item: TreeItem) {
    const expandable = checkHasChildren(item);
    const selectable = checkIsSelectable(item);

    if (!expandable && !selectable) return;

    return expandable ? toggleOpen() : handleSelectTreeItem(item);
  }

  const hasChildren = checkHasChildren(item);

  return {
    isSelected: selectTreeItem?.id === item.id,
    hasChildren,
    expandable: hasChildren,
    open,
    handleClickTreeItem,
  };
};
