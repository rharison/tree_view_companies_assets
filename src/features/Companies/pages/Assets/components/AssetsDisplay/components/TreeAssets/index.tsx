import { Spinner } from "@src/commons/components/Spinner";
import { TreeAssetsNode } from "./components/TreeAssetsNode";
import { useTreeAssetsController } from "./hooks/useTreeAssetsController";

export const TreeAssets = () => {
  const { treeData, hasExpandableItems, isProcessingTreeData } =
    useTreeAssetsController();

  if (isProcessingTreeData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-1 py-2 gap-1 h-full overflow-auto pb-4">
      {treeData.map((item) => (
        <TreeAssetsNode
          key={item.id}
          item={item}
          hasExpandableItems={hasExpandableItems}
        />
      ))}
    </div>
  );
};
