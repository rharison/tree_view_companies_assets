import { TreeItemType, type TreeItem } from "@commons/types/tree-view-assets";
import type { Location } from "@commons/types/locations";
import type { Asset } from "@src/commons/types/assets";

const KEY_WITHOUT_LOCATION = "without-location";

const sortTreeItems = (items: TreeItem[]): TreeItem[] => {
  return items
    .map((item) => ({
      ...item,
      children: sortTreeItems(item.children),
    }))
    .sort((a, b) => {
      const aHasChildren = a.children.length > 0;
      const bHasChildren = b.children.length > 0;

      if (aHasChildren && !bHasChildren) return -1;
      if (!aHasChildren && bHasChildren) return 1;
      return 0;
    });
};

export const mapLocationsTreeItem = (
  locations: Location[],
  mappedAssetsByLocation: Map<string, TreeItem[]>
): TreeItem[] => {
  const mapLocationsById = new Map<string, Location>(
    locations.map((loc) => [loc.id, loc] as [string, Location])
  );
  const mapCreatedNodesById = new Map<string, TreeItem>();
  const tree: TreeItem[] = [];

  const buildNode = (id: string): TreeItem => {
    if (mapCreatedNodesById.has(id)) return mapCreatedNodesById.get(id)!;

    const loc = mapLocationsById.get(id);

    if (!loc) throw new Error(`Location com id ${id} não encontrada`);

    const node: TreeItem = {
      id: loc.id,
      name: loc.name,
      type: TreeItemType.LOCATION,
      children: [...(mappedAssetsByLocation.get(loc.id) || [])],
    };

    mapCreatedNodesById.set(id, node);

    if (loc.parentId) {
      const parent = buildNode(loc.parentId);
      parent.children.push(node);
    } else {
      tree.push(node);
    }

    return node;
  };

  for (const loc of locations) {
    buildNode(loc.id);
  }

  tree.push(...(mappedAssetsByLocation.get(KEY_WITHOUT_LOCATION) || []));

  return sortTreeItems(tree);
};

export const mapAssetsTreeItems = (
  assets: Asset[]
): Map<string, TreeItem[]> => {
  return assets
    .sort((a, b) => {
      if (!a.parentId && b.parentId) return -1;
      if (a.parentId && !b.parentId) return 1;
      return 0;
    })
    .reduce((map, { id, name, parentId, sensorType, locationId, ...rest }) => {
      const node: TreeItem = {
        id,
        name,
        type: sensorType ? TreeItemType.COMPONENT : TreeItemType.ASSET,
        children: [],
        locationId,
        ...rest,
      };

      const locId = locationId || KEY_WITHOUT_LOCATION;

      if (!map.has(locId)) {
        map.set(locId, []);
      }

      const items = map.get(locId)!;

      if (!parentId) {
        items.push(node);
      } else {
        const parent = items.find((item) => item.id === parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          items.push(node);
        }
      }

      return map;
    }, new Map<string, TreeItem[]>());
};
export const mapTree = (locations: Location[], assets: Asset[]): TreeItem[] => {
  const mappedAssets = mapAssetsTreeItems(assets);
  return mapLocationsTreeItem(locations, mappedAssets);
};
