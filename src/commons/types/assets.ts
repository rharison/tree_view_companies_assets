export type Asset = {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  sensorId: string | null;
  sensorType: SensorType | null;
  status: AssetStatus | null;
  gatewayId?: string;
};

export enum SensorType {
  ENERGY = "energy",
  VIBRATION = "vibration",
}

export enum AssetStatus {
  OPERATING = "operating",
  ALERT = "alert",
}
