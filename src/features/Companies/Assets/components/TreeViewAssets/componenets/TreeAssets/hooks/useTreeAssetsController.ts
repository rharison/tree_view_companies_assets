import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { checkHasExpandableItems } from "../../../utils/expandableItems";
import { useMemo } from "react";

export const useTreeAssetsController = (data: TreeItem[]) => {
  const hasExpandableItems = useMemo(() => {
    return checkHasExpandableItems(data);
  }, [data]);

  return { hasExpandableItems };
};
