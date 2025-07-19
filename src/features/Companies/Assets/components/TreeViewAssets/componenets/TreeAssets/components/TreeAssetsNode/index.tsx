import Arrow from "@src/assets/icons/Arrow";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { resolveIconByTreeItemType } from "../../utils/resolveIconByTreeItemType";
import { resolveIconFeedbackStatusComponent } from "../../utils/resolveIconFeedbackStatusComponent";
import { useTreeAssetsNodeController } from "./hooks/useTreeAssetsNodeController";
import { cn } from "@src/commons/utils/className";

type TreeAssetsNodeProps = {
  item: TreeItem;
  hasExpandableItems: boolean;
};

export const TreeAssetsNode = ({
  item,
  hasExpandableItems,
}: TreeAssetsNodeProps) => {
  const { expandable, open, toggleOpen } = useTreeAssetsNodeController(item);
  const icon = resolveIconByTreeItemType(item.type);
  const feedbackIcon = resolveIconFeedbackStatusComponent(item);

  console.log("hasExpandableItems", hasExpandableItems);

  return (
    <button
      className={cn(
        "flex items-center gap-1 cursor-pointer  hover:bg-[#f0f4f7] p-1 rounded",
        !expandable && hasExpandableItems && "pl-4"
      )}
      onClick={toggleOpen}
    >
      {expandable && <Arrow up={!open} />}
      {icon}
      <span className="text-[#17192D] text-sm">{item.name}</span>
      {feedbackIcon}
    </button>
  );
};
