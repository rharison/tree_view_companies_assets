import { Header } from "./components/Header";
import { PageLayout } from "./components/PageLayout";
import { TreeViewAssetsProvider } from "./contexts/TreeViewAssetsContext";

export const TreeViewAssets = () => {
  return (
    <TreeViewAssetsProvider>
      <PageLayout>
        <Header />
      </PageLayout>
    </TreeViewAssetsProvider>
  );
};
