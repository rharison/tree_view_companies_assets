import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useCompanyContext } from "@src/features/Companies/contexts/CompanyContext";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { mapTree } from "../utils/mapper";
import { debounce } from "@src/commons/utils/debounce";

type AssetsContextProps = {
  selectTreeItem: TreeItem | null;
  treeData: TreeItem[];
  isProcessing: boolean;
  filter: AssetsFilter;
  handleSelectTreeItem: (item: TreeItem) => void;
  handleSearch: (search: string) => void;
  toggleFilter: (filter: keyof AssetsFilter) => void;
};

type AssetsFilter = {
  energySensor: boolean;
  critical: boolean;
  search: string;
};

type AssetsProviderProps = {
  children: React.ReactNode;
};

const initialAssetsFilter: AssetsFilter = {
  energySensor: false,
  critical: false,
  search: "",
};

const AssetsContext = createContext<AssetsContextProps | null>(null);

export function AssetsProvider({ children }: AssetsProviderProps) {
  const [selectTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [filter, setFilter] = useState<AssetsFilter>(initialAssetsFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { selectedCompanyId, isFetchingCompanies } = useCompanyContext();
  const { getLocationsByCompanieId, getAssetsByCompanieId } =
    useCompaniesService();

  useEffect(() => {
    if (selectedCompanyId) loadData(selectedCompanyId);
  }, [selectedCompanyId]);

  async function loadData(companyId: string) {
    try {
      setIsLoading(true);

      const [locations, assets] = await Promise.all([
        getLocationsByCompanieId(companyId),
        getAssetsByCompanieId(companyId),
      ]);

      startTransition(() => {
        setTreeData(mapTree(locations, assets));
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectTreeItem(item: TreeItem) {
    if (selectTreeItem?.id === item.id) {
      setSelectedTreeItem(null);
      return;
    }
    setSelectedTreeItem(item);
  }

  function toggleFilter(filterKey: keyof AssetsFilter) {
    setFilter((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  }

  const debouncedHandleSearch = debounce((search: string) => {
    setFilter((prev) => ({
      ...prev,
      search,
    }));
  }, 300);

  console.log("search", filter.search);

  return (
    <AssetsContext.Provider
      value={{
        treeData,
        selectTreeItem,
        isProcessing: isLoading || isPending || isFetchingCompanies,
        filter,
        handleSelectTreeItem,
        toggleFilter,
        handleSearch: debouncedHandleSearch,
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
