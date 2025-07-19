import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { TreeAssetsNode } from "./components/TreeAssetsNode";

type TreeAssetsProps = {
  data: TreeItem[];
};

export const TreeAssets = ({ data }: TreeAssetsProps) => {
  return (
    <div className="flex flex-col px-1 py-2">
      {data.map((item) => (
        <TreeAssetsNode key={item.id} item={item} />
      ))}
    </div>
  );
};
