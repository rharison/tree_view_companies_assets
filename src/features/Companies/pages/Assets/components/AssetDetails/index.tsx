import { cn } from "@src/commons/utils/className";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { resolveIconFeedbackStatusComponent } from "../AssetsDisplay/components/TreeAssets/utils/iconResolver";
import { Divider } from "@src/commons/components/Divider";
import Inbox from "@src/assets/icons/Inbox";
import { Avatar } from "@src/commons/components/Avatar";
import { DisplayInfo } from "./components/DisplayInfo";
import { SensorType } from "@src/commons/types/assets";
import Sensor from "@src/assets/icons/Sensor";
import Router from "@src/assets/icons/Router";

export const AssetDetails = () => {
  const { selectTreeItem } = useAssetsContext();
  const feedbackIcon = selectTreeItem
    ? resolveIconFeedbackStatusComponent(selectTreeItem)
    : null;

  const isEletricalSensor = selectTreeItem?.sensorType === SensorType.ENERGY;
  const responsibleLabel = isEletricalSensor ? "Elétrica" : "Mecânica";

  return (
    <div className="flex flex-col w-full h-full border border-[#D8DFE6] rounded-[2px]">
      <header className="h-[45px] border-b border-[#D8DFE6] flex items-center px-4 py-3.5">
        <span
          className={cn(
            "text-[#24292F] flex items-center gap-2",
            selectTreeItem ? "font-semibold" : "font-normal text-[#77818C]"
          )}
        >
          {selectTreeItem ? (
            <>
              {selectTreeItem?.name}
              {feedbackIcon}
            </>
          ) : (
            "Detalhes do Ativo"
          )}
        </span>
      </header>
      {!selectTreeItem && (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-xs text-[#77818C]">
            Selecione um ativo para ver os detalhes.
          </span>
        </div>
      )}
      {selectTreeItem && (
        <div className="flex flex-col h-full p-6">
          <div className="flex gap-6">
            <div className="w-[336px] h-[226px] bg-[#F2F8FF] border border-dashed border-[#55A6FF] rounded-[4px] flex flex-col items-center justify-center gap-1">
              <Inbox />
              <span className="text-[#2188FF] text-sm">
                Adicionar imagem do Ativo
              </span>
            </div>
            <div className="w-full flex flex-col gap-2 justify-center">
              <DisplayInfo
                label="Tipo de Equipamento"
                description="Motor Elétrico (Trifásico)"
              />
              <Divider />
              <DisplayInfo
                label="Responsáveis"
                description={
                  <div className="flex gap-2">
                    <Avatar letter={responsibleLabel.charAt(0)} />
                    <span className="text-[#88929C] text-[16px]">
                      {responsibleLabel}
                    </span>
                  </div>
                }
              />
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-3 gap-4">
            {selectTreeItem.sensorId && (
              <DisplayInfo
                label="Sensor"
                description={
                  <div className="flex gap-2">
                    <Sensor />
                    <span className="text-[#88929C] text-[16px]">
                      {selectTreeItem.sensorId}
                    </span>
                  </div>
                }
              />
            )}
            {selectTreeItem.gatewayId && (
              <DisplayInfo
                label="Receptor"
                description={
                  <div className="flex gap-2">
                    <Router />
                    <span className="text-[#88929C] text-[16px]">
                      {selectTreeItem.gatewayId}
                    </span>
                  </div>
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
