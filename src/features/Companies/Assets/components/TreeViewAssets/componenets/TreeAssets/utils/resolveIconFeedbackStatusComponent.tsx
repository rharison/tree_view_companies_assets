import AssetStatusFeedback from "@src/assets/icons/AssetStatusFeedback";
import Bolt from "@src/assets/icons/Bolt";
import { AssetStatus, SensorType } from "@src/commons/types/assets";
import { type TreeItem } from "@src/commons/types/tree-view-assets";

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
