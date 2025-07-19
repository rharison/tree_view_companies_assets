import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useState } from "react";

export const useTreeAssetsNodeController = (item: TreeItem) => {
  const [open, setOpen] = useState(false);
  const expandable = item.children && item.children.length > 0;

  function toggleOpen() {
    setOpen((prevOpen) => !prevOpen);
  }

  return {
    expandable,
    open,
    toggleOpen,
  };
};
