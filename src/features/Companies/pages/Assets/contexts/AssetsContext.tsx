import type { Asset } from "@src/commons/types/assets";
import type { Location } from "@src/commons/types/locations";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useCompanyContext } from "@src/features/Companies/contexts/CompanyContext";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mapTree } from "../utils/mapper";

type AssetsContextProps = {
  selectTreeItem: TreeItem | null;
  treeData: TreeItem[];
  handleSelectTreeItem: (item: TreeItem) => void;
};

type AssetsProviderProps = {
  children: React.ReactNode;
};

const AssetsContext = createContext<AssetsContextProps | null>(null);

export function AssetsProvider({ children }: AssetsProviderProps) {
  const [selectTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const { selectedCompanyId } = useCompanyContext();
  const { getLocationsByCompanieId, getAssetsByCompanieId } =
    useCompaniesService();

  useEffect(() => {
    if (!selectedCompanyId) return;
    (async () => {
      const [locations, assets] = await Promise.all([
        getLocationsByCompanieId(selectedCompanyId),
        getAssetsByCompanieId(selectedCompanyId),
      ]);

      setLocations(locations);
      setAssets(assets);
    })();
  }, [selectedCompanyId]);

  function handleSelectTreeItem(item: TreeItem) {
    if (selectTreeItem?.id === item.id) {
      setSelectedTreeItem(null);
      return;
    }
    setSelectedTreeItem(item);
  }

  const treeData = useMemo(() => {
    return mapTree(locations, assets);
  }, [locations, assets]);

  return (
    <AssetsContext.Provider
      value={{
        treeData,
        selectTreeItem,
        handleSelectTreeItem,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);

  if (!context) {
    throw new Error("useAssetsContext must be used within a AssetsProvider");
  }

  return context;
};
