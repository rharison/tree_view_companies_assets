import Gold from "@src/assets/icons/Gold";
import LogoTractian from "@src/assets/images/LogoTractian";
import { cn } from "@src/commons/utils/className";
import { useCompanyContext } from "../../../../contexts/CompanyContext";
import { CompaniesButtonsSkeleton } from "./components/CompaniesButtonsSkeleton";

export const Header = () => {
  const {
    companies,
    selectedCompanyId,
    isFetchingCompanies,
    handleSelectCompany,
  } = useCompanyContext();

  return (
    <nav className="bg-[#17192D] flex h-12 justify-between items-center py-3 px-4">
      <a href="https://tractian.com/en" target="_blank" rel="noreferrer">
        <LogoTractian />
      </a>
      <div className="flex gap-[10px]">
        {isFetchingCompanies && <CompaniesButtonsSkeleton />}
        {!isFetchingCompanies &&
          companies.map((company) => (
            <button
              key={company.id}
              className={cn(
                "text-white h-6 py-1 px-2 text-xs rounded-[2px] flex items-center gap-2 cursor-pointer",
                company.id === selectedCompanyId
                  ? "bg-[#2188FF]"
                  : "bg-[#023B78]"
              )}
              onClick={() => handleSelectCompany(company.id)}
            >
              <Gold />
              {company.name}
            </button>
          ))}
      </div>
    </nav>
  );
};
