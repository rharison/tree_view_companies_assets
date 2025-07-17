import type { Company } from "@src/commons/types/companies";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import { createContext, useContext, useEffect, useState } from "react";

type TreeViewAssetsContextProps = {
  selectedCompanyId: string | null;
  selectedCompanyName: string | null;
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
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { getCompanies } = useCompaniesService();

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const result = await getCompanies();

      setCompanies(result);

      if (result.length > 0) setSelectedCompany(result[0]);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setIsFetchingCompanies(false);
    }
  }

  function handleSelectCompany(companyId: string) {
    const company = companies.find((c) => c.id === companyId);

    if (!company) {
      throw new Error(`Company with id ${companyId} not found`);
    }

    setSelectedCompany(company);
  }

  return (
    <TreeViewAssetsContext.Provider
      value={{
        selectedCompanyId: selectedCompany?.id || null,
        selectedCompanyName: selectedCompany?.name || null,
        companies,
        handleSelectCompany,
      }}
    >
      {children}
    </TreeViewAssetsContext.Provider>
  );
}

export const useTreeViewAssetsContext = () => {
  const context = useContext(TreeViewAssetsContext);

  if (!context) {
    throw new Error(
      "useTreeViewAssetsContext must be used within a TreeViewAssetsProvider"
    );
  }

  return context;
};
