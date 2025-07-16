import { AssetStatus, SensorType, type Asset } from "@src/commons/types/assets";
import {
  TreeItemType,
  type TreeItem,
} from "@src/commons/types/tree-view-assets";
import { expect, test } from "vitest";
import { KEY_WITHOUT_LOCATION, mapAssetsTreeItems } from "./mapper";

test("when calling mapAssetsTreeItems, should return a map of assets with children by location", () => {
  const assetsMock: Asset[] = [
    {
      id: "1",
      name: "Asset 1",
      parentId: null,
      locationId: "loc_1",
      sensorId: null,
      sensorType: null,
      status: null,
    },
    {
      id: "2",
      name: "Asset 2",
      parentId: "1",
      locationId: null,
      sensorId: "sensor_1",
      sensorType: SensorType.ENERGY,
      status: AssetStatus.ALERT,
    },
    {
      id: "3",
      name: "Asset 3",
      parentId: null,
      locationId: null,
      sensorId: "sensor_2",
      sensorType: SensorType.VIBRATION,
      status: AssetStatus.OPERATING,
    },
  ];

  const result = mapAssetsTreeItems(assetsMock);

  console.log("Result:", result);
  const expected = new Map<string, TreeItem[]>(
    Object.entries({
      loc_1: [
        {
          id: "1",
          name: "Asset 1",
          type: TreeItemType.ASSET,
          locationId: "loc_1",
          sensorId: null,
          sensorType: null,
          status: null,
          children: [
            {
              id: "2",
              name: "Asset 2",
              type: TreeItemType.COMPONENT,
              locationId: null,
              sensorId: "sensor_1",
              sensorType: SensorType.ENERGY,
              status: AssetStatus.ALERT,
              children: [],
            },
          ],
        },
      ],
      [KEY_WITHOUT_LOCATION]: [
        {
          id: "3",
          name: "Asset 3",
          locationId: null,
          type: TreeItemType.COMPONENT,
          sensorId: "sensor_2",
          sensorType: SensorType.VIBRATION,
          status: AssetStatus.OPERATING,
          children: [],
        },
      ],
    })
  );

  expect(result).toEqual(expected);
});
