import { TreeViewAssetsProvider } from "./contexts/TreeViewAssetsContext";

export const TreeViewAssets = () => {
  return (
    <TreeViewAssetsProvider>
      <div>Tree View Assets</div>
    </TreeViewAssetsProvider>
  );
};
