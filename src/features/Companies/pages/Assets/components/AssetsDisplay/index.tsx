import { useCompanyContext } from "../../../../contexts/CompanyContext";
import { AssetsProvider } from "../../contexts/AssetsContext";
import { AssetDetails } from "../AssetDetails";
import { Filters } from "./components/Filters";
import { InputSearch } from "./components/InputSearch";
import { TreeAssets } from "./components/TreeAssets";

export const AssetsDisplay = () => {
  const { selectedCompanyName } = useCompanyContext();

  return (
    <AssetsProvider>
      <div className="flex flex-col w-full bg-[#dee7ec] h-[calc(100vh-48px)] p-2 justify-center items-center">
        <div className="w-full h-full flex flex-col border border-[#D8DFE6] bg-white rounded-[4px] p-4 gap-3">
          <header className="flex items-center justify-between">
            <div>
              <span className="text-[#24292F] font-semibold text-[20px] leading-7">
                Ativos
              </span>
              {selectedCompanyName && (
                <span className="text-[#77818C] text-sm leading-5">
                  {" "}
                  / {selectedCompanyName}
                </span>
              )}
            </div>
            <Filters />
          </header>
          <div className="flex h-full gap-2 overflow-hidden">
            <div className="flex flex-col w-[40%] overflow-auto h-full border border-[#D8DFE6] rounded-[2px]">
              <InputSearch />
              <TreeAssets />
            </div>
            <AssetDetails />
          </div>
        </div>
      </div>
    </AssetsProvider>
  );
};
