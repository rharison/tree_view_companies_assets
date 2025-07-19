import Gold from "@src/assets/icons/Gold";
import LogoTractian from "@src/assets/images/LogoTractian";
import { cn } from "@src/commons/utils/className";
import { useTreeViewAssetsContext } from "../../contexts/TreeViewAssetsContext";

export const Header = () => {
  const { companies, selectedCompanyId, handleSelectCompany } =
    useTreeViewAssetsContext();

  return (
    <nav className="bg-[#17192D] flex h-12 justify-between items-center py-3 px-4">
      <LogoTractian />
      <div className="flex gap-[10px]">
        {companies.map((company) => (
          <button
            key={company.id}
            className={cn(
              "text-white h-6 py-1 px-2 text-xs rounded-[2px] flex items-center gap-2 cursor-pointer",
              company.id === selectedCompanyId ? "bg-[#2188FF]" : "bg-[#023B78]"
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
