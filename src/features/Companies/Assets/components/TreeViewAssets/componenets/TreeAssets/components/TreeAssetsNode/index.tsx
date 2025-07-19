import type { TreeItem } from "@src/commons/types/tree-view-assets";

type TreeAssetsNodeProps = {
  item: TreeItem;
};

export const TreeAssetsNode = ({ item }: TreeAssetsNodeProps) => {
  return <span>{item.name}</span>;
};
