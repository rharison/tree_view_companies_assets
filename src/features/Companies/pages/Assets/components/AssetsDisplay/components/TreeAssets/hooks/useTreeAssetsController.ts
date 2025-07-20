import { useAssetsContext } from "@src/features/Companies/pages/Assets/contexts/AssetsContext";
import { useMemo } from "react";
import { checkHasExpandableItems } from "../../../utils/expandableItems";

export const useTreeAssetsController = () => {
  const { treeData, isProcessing } = useAssetsContext();

  const hasExpandableItems = useMemo(() => {
    return checkHasExpandableItems(treeData);
  }, [treeData]);

  return { treeData, hasExpandableItems, isProcessingTreeData: isProcessing };
};
