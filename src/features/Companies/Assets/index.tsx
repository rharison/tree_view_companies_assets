import { AssetsViewCard } from "./components/AssetsViewCard";
import { Header } from "./components/Header";
import { TreeViewAssetsProvider } from "./contexts/TreeViewAssetsContext";

export const TreeViewAssets = () => {
  return (
    <TreeViewAssetsProvider>
      <Header />
      <AssetsViewCard />
    </TreeViewAssetsProvider>
  );
};
