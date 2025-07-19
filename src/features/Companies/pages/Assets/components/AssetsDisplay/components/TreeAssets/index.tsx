import { TreeAssetsNode } from "./components/TreeAssetsNode";
import { useTreeAssetsController } from "./hooks/useTreeAssetsController";

export const TreeAssets = () => {
  const { treeData, hasExpandableItems } = useTreeAssetsController();

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
