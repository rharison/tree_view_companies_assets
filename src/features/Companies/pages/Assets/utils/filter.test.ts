import { describe, expect, it } from "vitest";
import { filterTree } from "./filter";
import { AssetStatus, SensorType } from "@src/commons/types/assets";
import { treeDataMock } from "@src/commons/mocks/treeData";
import type { TreeItem } from "@src/commons/types/tree-view-assets";

describe("test filterTree", () => {
  it("should filter items with sensorType ENERGY", () => {
    const result = filterTree(
      treeDataMock,
      (item) => item.sensorType === SensorType.ENERGY
    );

    expect(result).toHaveLength(1);
    const root = result[0];
    expect(root.name).toBe(treeDataMock[0].name);

    const ids = collectIds(result);
    expect(ids).toContain("10");
    expect(ids).toContain("11");
    expect(ids).toContain("12");
    expect(ids).toContain("5");
  });

  it("should filter items with status ALERT", () => {
    const result = filterTree(
      treeDataMock,
      (item) => item.status === AssetStatus.ALERT
    );

    const ids = collectIds(result);
    expect(ids).toContain("10");
    expect(ids).toContain("11");

    expect(ids).not.toContain("12");

    expect(ids).toContain("1");
    expect(ids).toContain("3");
    expect(ids).toContain("9");
  });

  it("should filter items with ENERGY + ALERT", () => {
    const result = filterTree(treeDataMock, (item) => {
      return (
        item.sensorType === SensorType.ENERGY &&
        item.status === AssetStatus.ALERT
      );
    });

    const ids = collectIds(result);
    expect(ids).toContain("10");
    expect(ids).toContain("11");
    expect(ids).not.toContain("12");
    expect(ids).not.toContain("5");
  });

  it("should return empty array if no items match", () => {
    const result = filterTree(treeDataMock, (item) => {
      return (
        item.sensorType === SensorType.VIBRATION &&
        item.status === AssetStatus.ALERT
      );
    });
    expect(result).toEqual([]);
  });

  it("should return all items if all pass the filter", () => {
    const result = filterTree(treeDataMock, () => true);
    expect(result).toEqual(treeDataMock);
  });
});

function collectIds(tree: TreeItem[]): string[] {
  const ids: string[] = [];

  function traverse(nodes: TreeItem[]) {
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) traverse(node.children);
    }
  }

  traverse(tree);
  return ids;
}
