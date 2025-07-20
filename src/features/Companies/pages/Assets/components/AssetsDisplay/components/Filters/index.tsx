import Thuderbolt from "@src/assets/icons/Thuderbolt";
import { FilterButton } from "../../../FilterButton";
import Alert from "@src/assets/icons/Alert";
import { useAssetsContext } from "../../../../contexts/AssetsContext";

export const Filters = () => {
  const { filter, toggleFilter } = useAssetsContext();

  return (
    <div className="flex items-center gap-2">
      <FilterButton
        active={filter.energySensor}
        onClick={() => toggleFilter("energySensor")}
        label="Sensor de Energia"
        icon={<Thuderbolt active={filter.energySensor} />}
      />
      <FilterButton
        active={filter.critical}
        onClick={() => toggleFilter("critical")}
        label="Crítico"
        icon={<Alert active={filter.critical} />}
      />
    </div>
  );
};
