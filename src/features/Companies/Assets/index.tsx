import { AssetsViewCard } from "./components/AssetsViewCard";
import { Header } from "./components/Header";
import { AssetsProvider } from "./contexts/TreeViewAssetsContext";

export const Assets = () => {
  return (
    <AssetsProvider>
      <Header />
      <AssetsViewCard />
    </AssetsProvider>
  );
};
