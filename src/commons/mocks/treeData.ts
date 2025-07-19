import { AssetStatus, SensorType } from "@src/commons/types/assets";
import {
  TreeItemType,
  type TreeItem,
} from "@src/commons/types/tree-view-assets";

export const treeDataMock: TreeItem[] = [
  {
    id: "1",
    name: "PRODUCTION AREA - RAW MATERIAL",
    type: TreeItemType.LOCATION,
    children: [
      {
        id: "2",
        name: "CHARCOAL STORAGE SECTOR",
        type: TreeItemType.LOCATION,
        children: [
          {
            id: "6",
            locationId: "2",
            name: "CONVEYOR BELT ASSEMBLY",
            type: TreeItemType.ASSET,
            children: [
              {
                id: "7",
                name: "MOTOR TC01 COAL UNLOADING AF02",
                type: TreeItemType.ASSET,
                children: [
                  {
                    id: "8",
                    name: "MOTOR RT COAL AF01",
                    type: TreeItemType.COMPONENT,
                    status: AssetStatus.OPERATING,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Machinery House",
        type: TreeItemType.LOCATION,
        children: [
          {
            id: "9",
            locationId: "3",
            name: "MOTORS H12D",
            type: TreeItemType.ASSET,
            children: [
              {
                id: "10",
                name: "MOTORS H12D - Stage 1",
                type: TreeItemType.COMPONENT,
                status: AssetStatus.ALERT,
                children: [],
              },
              {
                id: "11",
                name: "MOTORS H12D - Stage 2",
                type: TreeItemType.COMPONENT,
                status: AssetStatus.ALERT,
                children: [],
              },
              {
                id: "11",
                name: "MOTORS H12D - Stage 2",
                type: TreeItemType.COMPONENT,
                sensorType: SensorType.ENERGY,
                status: AssetStatus.OPERATING,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "EMPTY MACHINE HOUSE",
    type: TreeItemType.LOCATION,
    children: [],
  },
  {
    id: "5",
    name: "Fan - External",
    type: TreeItemType.COMPONENT,
    sensorType: SensorType.ENERGY,
    status: AssetStatus.OPERATING,
    children: [],
  },
];
