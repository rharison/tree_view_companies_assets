import type { TreeItem } from "@src/commons/types/tree-view-assets";

import { useMemo } from "react";
import { checkHasExpandableItems } from "../../../utils/expandableItems";

export const useTreeAssetsController = (data: TreeItem[]) => {
  const hasExpandableItems = useMemo(() => {
    return checkHasExpandableItems(data);
  }, [data]);

  return { hasExpandableItems };
};
