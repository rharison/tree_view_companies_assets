import Alert from "@src/assets/icons/Alert";
import Thuderbolt from "@src/assets/icons/Thuderbolt";
import { useTreeViewAssetsContext } from "../../contexts/TreeViewAssetsContext";
import { FilterButton } from "../FilterButton";

export const AssetsViewCard = () => {
  const { selectedCompanyName } = useTreeViewAssetsContext();

  return (
    <div className="flex flex-col w-full bg-[#dee7ec] h-[calc(100vh-48px)] p-2 justify-center items-center">
      <div className="w-full h-full flex flex-col border border-[#D8DFE6] bg-white rounded-[4px] p-4">
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
          <div className="flex items-center gap-2">
            <FilterButton
              onClick={console.log}
              label="Sensor de Energia"
              icon={<Thuderbolt active={false} />}
            />
            <FilterButton
              onClick={console.log}
              label="Crítico"
              icon={<Alert active={false} />}
            />
          </div>
        </header>
      </div>
    </div>
  );
};
