import type { AssetStatus, SensorType } from "./assets";

export type TreeItem = {
  id: string;
  name: string;
  type: TreeItemType;
  locationId?: string | null;
  sensorId?: string | null;
  sensorType?: SensorType | null;
  status?: AssetStatus | null;
  gatewayId?: string;
  children: TreeItem[];
};

export enum TreeItemType {
  LOCATION = "location",
  ASSET = "asset",
  COMPONENT = "component",
}
