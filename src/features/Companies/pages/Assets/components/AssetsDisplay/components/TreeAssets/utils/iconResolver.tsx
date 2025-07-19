import AssetStatusFeedback from "@src/assets/icons/AssetStatusFeedback";
import Bolt from "@src/assets/icons/Bolt";
import Codepen from "@src/assets/icons/Codepen";
import Cube from "@src/assets/icons/Cube";
import Location from "@src/assets/icons/Location";
import { AssetStatus, SensorType } from "@src/commons/types/assets";
import {
  TreeItemType,
  type TreeItem,
} from "@src/commons/types/tree-view-assets";

export function resolveIconByTreeItemType(
  type: TreeItemType,
  isSelected: boolean
) {
  const fillColor = isSelected ? "#FFFFFF" : "#2188FF";

  switch (type) {
    case TreeItemType.LOCATION:
      return <Location fill={fillColor} />;
    case TreeItemType.ASSET:
      return <Cube fill={fillColor} />;
    case TreeItemType.COMPONENT:
      return <Codepen fill={fillColor} />;
    default:
      return <>NA</>;
  }
}

export function resolveIconFeedbackStatusComponent(treeItem: TreeItem) {
  if (!treeItem.sensorType || !treeItem.status) return null;

  const isVibrationSensor = treeItem.sensorType === SensorType.VIBRATION;
  const isInAlert = treeItem.status === AssetStatus.ALERT;

  return isVibrationSensor || isInAlert ? (
    <AssetStatusFeedback status={treeItem.status} />
  ) : (
    <Bolt />
  );
}
