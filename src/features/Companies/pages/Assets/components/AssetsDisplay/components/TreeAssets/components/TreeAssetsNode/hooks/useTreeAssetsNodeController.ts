import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useAssetsContext } from "@src/features/Companies/pages/Assets/contexts/AssetsContext";

export const useTreeAssetsNodeController = (item: TreeItem) => {
  const {
    handleSelectTreeItem,
    isTreeItemOpened,
    toggleOpenedTreeItem,
    selectTreeItem,
  } = useAssetsContext();

  function checkHasChildren(item: TreeItem) {
    return item.children && item.children.length > 0;
  }

  function checkIsSelectable(item: TreeItem) {
    return Boolean(item.sensorType) && !checkHasChildren(item);
  }

  function handleClickTreeItem(item: TreeItem) {
    const expandable = checkHasChildren(item);
    const selectable = checkIsSelectable(item);

    if (!expandable && !selectable) return;

    return expandable
      ? toggleOpenedTreeItem(item.id)
      : handleSelectTreeItem(item);
  }

  const hasChildren = checkHasChildren(item);

  return {
    isSelected: selectTreeItem?.id === item.id,
    hasChildren,
    expandable: hasChildren,
    open: isTreeItemOpened(item.id),
    handleClickTreeItem,
  };
};
