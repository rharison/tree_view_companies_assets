import type { TreeItem } from "@commons/types/tree-view-assets";
import type { Location } from "@commons/types/locations";

export const mapLocationsWithSubLocationsToTreeItem = (
  locations: Location[]
): TreeItem[] => {
  return locations
    .sort((a, b) => {
      if (!a.parentId && b.parentId) return -1;
      if (a.parentId && !b.parentId) return 1;

      return 0;
    })
    .reduce((acc: TreeItem[], { id, name, parentId }) => {
      const node: TreeItem = { id, name, children: [] };

      if (!parentId) {
        acc.push(node);
      } else {
        const parent = acc.find((item) => item.id === parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          acc.push(node);
        }
      }

      return acc;
    }, []);
};
