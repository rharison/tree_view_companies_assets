import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useCompanyContext } from "@src/features/Companies/contexts/CompanyContext";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { mapTree } from "../utils/mapper";
import { debounce } from "@src/commons/utils/debounce";
import { AssetStatus, SensorType } from "@src/commons/types/assets";
import { filterTree } from "../utils/filter";

type AssetsContextProps = {
  selectTreeItem: TreeItem | null;
  treeData: TreeItem[];
  isProcessing: boolean;
  filter: AssetsFilter;
  hasAppliedFilters: boolean;
  handleSelectTreeItem: (item: TreeItem) => void;
  handleSearch: (search: string) => void;
  toggleFilter: (filter: keyof AssetsFilter) => void;
  toggleOpenedTreeItem: (itemId: string) => void;
  isTreeItemOpened: (itemId: string) => boolean;
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
  const [filteredTreeData, setFilteredTreeData] = useState<TreeItem[]>([]);
  const [filter, setFilter] = useState<AssetsFilter>(initialAssetsFilter);
  const [openedTreeItems, setOpenedTreeItems] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { selectedCompanyId, isFetchingCompanies } = useCompanyContext();
  const { getLocationsByCompanieId, getAssetsByCompanieId } =
    useCompaniesService();

  useEffect(() => {
    if (selectedCompanyId) loadData(selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    if (!hasAppliedFilters) return;

    startTransition(() => {
      const predicate = buildPredicateByFilters(filter);
      const result = filterTree(treeData, predicate);
      setFilteredTreeData(result);
    });
  }, [treeData, filter]);

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

  const hasAppliedFilters = useMemo(() => {
    return Object.values(filter).some((value) => value);
  }, [filter]);

  function buildPredicateByFilters(filter: AssetsFilter) {
    return (item: TreeItem) => {
      const matchesSearch =
        !filter.search ||
        item.name.toLowerCase().includes(filter.search.toLowerCase());

      const matchesEnergySensor =
        !filter.energySensor || item.sensorType === SensorType.ENERGY;

      const matchesCritical =
        !filter.critical || item.status === AssetStatus.ALERT;

      return matchesSearch && matchesEnergySensor && matchesCritical;
    };
  }

  function toggleOpenedTreeItem(itemId: string) {
    setOpenedTreeItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }

  function isTreeItemOpened(itemId: string) {
    return openedTreeItems.has(itemId);
  }

  return (
    <AssetsContext.Provider
      value={{
        treeData: hasAppliedFilters ? filteredTreeData : treeData,
        selectTreeItem,
        isProcessing: isLoading || isPending || isFetchingCompanies,
        filter,
        hasAppliedFilters,
        handleSelectTreeItem,
        toggleFilter,
        handleSearch: debouncedHandleSearch,
        isTreeItemOpened,
        toggleOpenedTreeItem,
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
