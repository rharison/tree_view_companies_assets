import type { TreeItem } from "@commons/types/tree-view-assets";

export function checkHasExpandableItems(items: TreeItem[]): boolean {
  return items.some((item) => item.children && item.children.length > 0);
}
