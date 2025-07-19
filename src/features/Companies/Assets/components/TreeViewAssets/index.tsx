import { InputSearch } from "./componenets/InputSearch";
import { TreeAssets } from "./componenets/TreeAssets";
import { useTreeViewAssetsController } from "./hooks/useTreeViewAssetsController";

export const TreeViewAssets = () => {
  const { treeData } = useTreeViewAssetsController();

  return (
    <div className="flex flex-col w-[40%] h-full border border-[#D8DFE6] rounded-[2px]">
      <InputSearch />
      <TreeAssets data={treeData} />
    </div>
  );
};
