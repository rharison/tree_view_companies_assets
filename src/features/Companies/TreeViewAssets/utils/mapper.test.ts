import { expect, test } from "vitest";

import { mapLocationsWithSubLocationsToTreeItem } from "./mapper";

test("should map locations with sub-locations to tree items", () => {
  const locationsMock = [
    { id: "1", name: "Location 1", parentId: null },
    { id: "2", name: "Location 2", parentId: "1" },
    { id: "3", name: "Location 3", parentId: "1" },
    { id: "4", name: "Location 4", parentId: null },
  ];

  const result = mapLocationsWithSubLocationsToTreeItem(locationsMock);

  expect(result).toEqual([
    {
      id: "1",
      name: "Location 1",
      children: [
        { id: "2", name: "Location 2", children: [] },
        { id: "3", name: "Location 3", children: [] },
      ],
    },
    {
      id: "4",
      name: "Location 4",
      children: [],
    },
  ]);
});
