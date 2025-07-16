import type { Company } from "@src/commons/types/companies";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import { createContext, useContext, useEffect, useState } from "react";

type TreeViewAssetsContextProps = {
  selectedCompanyId: string | null;
  companies: Company[];
  handleSelectCompany: (companyId: string) => void;
};

type TreeViewAssetsProviderProps = {
  children: React.ReactNode;
};

const TreeViewAssetsContext = createContext<TreeViewAssetsContextProps | null>(
  null
);

export function TreeViewAssetsProvider({
  children,
}: TreeViewAssetsProviderProps) {
  const [isFetchingCompanies, setIsFetchingCompanies] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );

  const { getCompanies } = useCompaniesService();

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const result = await getCompanies();

      setCompanies(result);

      if (result.length > 0) setSelectedCompanyId(result[0].id);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setIsFetchingCompanies(false);
    }
  }

  function handleSelectCompany(companyId: string) {
    setSelectedCompanyId(companyId);
  }

  return (
    <TreeViewAssetsContext.Provider
      value={{ selectedCompanyId, companies, handleSelectCompany }}
    >
      {children}
    </TreeViewAssetsContext.Provider>
  );
}

export const useTreeViewAssetsFormContext = () => {
  const context = useContext(TreeViewAssetsContext);

  if (!context) {
    throw new Error(
      "useTreeViewAssetsFormContext must be used within a TreeViewAssetsProvider"
    );
  }

  return context;
};
