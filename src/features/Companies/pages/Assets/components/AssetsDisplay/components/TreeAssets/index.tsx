import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { TreeAssetsNode } from "./components/TreeAssetsNode";
import { useTreeAssetsController } from "./hooks/useTreeAssetsController";

type TreeAssetsProps = {
  data: TreeItem[];
  onSelectItem: (item: TreeItem) => void;
};

export const TreeAssets = ({ data, onSelectItem }: TreeAssetsProps) => {
  const { hasExpandableItems } = useTreeAssetsController(data);

  return (
    <div className="flex flex-col px-1 py-2 gap-1">
      {data.map((item) => (
        <TreeAssetsNode
          key={item.id}
          item={item}
          hasExpandableItems={hasExpandableItems}
        />
      ))}
    </div>
  );
};
