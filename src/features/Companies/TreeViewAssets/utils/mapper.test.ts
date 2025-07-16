import { AssetStatus, SensorType, type Asset } from "@src/commons/types/assets";
import { type Location } from "@src/commons/types/locations";
import {
  TreeItemType,
  type TreeItem,
} from "@src/commons/types/tree-view-assets";
import { expect, test } from "vitest";
import {
  KEY_WITHOUT_LOCATION,
  mapAssetsTreeItems,
  mapLocationsTreeItem,
} from "./mapper";

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

test("when calling mapLocationsTreeItem, should return a tree structure of locations with assets", () => {
  const mapOfAssets = new Map<string, TreeItem[]>(
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

  const locationsMock: Location[] = [
    {
      id: "loc_0",
      name: "Location 1",
      parentId: null,
    },
    {
      id: "loc_1",
      name: "Location 2",
      parentId: "loc_0",
    },
    {
      id: "loc_2",
      name: "Location 3",
      parentId: "loc_1",
    },
    {
      id: "loc_3",
      name: "Location 4",
      parentId: null,
    },
  ];

  const result = mapLocationsTreeItem(locationsMock, mapOfAssets);
  const expected: TreeItem[] = [
    {
      id: "loc_0",
      name: "Location 1",
      type: TreeItemType.LOCATION,
      children: [
        {
          id: "loc_1",
          name: "Location 2",
          type: TreeItemType.LOCATION,
          children: [
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
            {
              id: "loc_2",
              name: "Location 3",
              type: TreeItemType.LOCATION,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "loc_3",
      name: "Location 4",
      type: TreeItemType.LOCATION,
      children: [],
    },
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
  ];

  expect(result).toEqual(expected);
});
