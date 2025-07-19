import Codepen from "@src/assets/icons/Codepen";
import Cube from "@src/assets/icons/Cube";
import Location from "@src/assets/icons/Location";
import { TreeItemType } from "@src/commons/types/tree-view-assets";

export function resolveIconsByTreeItemType(type: TreeItemType) {
  switch (type) {
    case TreeItemType.LOCATION:
      return <Location />;
    case TreeItemType.ASSET:
      return <Cube />;
    case TreeItemType.COMPONENT:
      return <Codepen />;
    default:
      return <>NA</>;
  }
}
