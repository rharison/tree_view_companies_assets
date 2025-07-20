import type { TreeItem } from "@src/commons/types/tree-view-assets";

export function filterTree(
  nodes: TreeItem[],
  predicate: (item: TreeItem) => boolean
): TreeItem[] {
  return nodes
    .map((node) => {
      const filteredChildren = filterTree(node.children, predicate);

      const isMatch = predicate(node);

      if (isMatch || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((node): node is TreeItem => node !== null);
}
