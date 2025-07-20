import TopLoadingBar from "@src/commons/components/TopLoadingBar";
import type { Company } from "@src/commons/types/companies";
import { useCompaniesService } from "@src/services/companies/useCompaniesService";
import { createContext, useContext, useEffect, useState } from "react";

type CompanyContextProps = {
  selectedCompanyId: string | null;
  selectedCompanyName: string | null;
  companies: Company[];
  isFetchingCompanies: boolean;
  handleSelectCompany: (companyId: string) => void;
};

type CompanyProviderProps = {
  children: React.ReactNode;
};

const CompanyContext = createContext<CompanyContextProps | null>(null);

export function CompanyProvider({ children }: CompanyProviderProps) {
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
    <CompanyContext.Provider
      value={{
        selectedCompanyId: selectedCompany?.id || null,
        selectedCompanyName: selectedCompany?.name || null,
        companies,
        isFetchingCompanies,
        handleSelectCompany,
      }}
    >
      {isFetchingCompanies && <TopLoadingBar />}
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }

  return context;
};
