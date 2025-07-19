import Arrow from "@src/assets/icons/Arrow";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { useTreeAssetsNodeController } from "./hooks/useTreeAssetsNodeController";
import { cn } from "@src/commons/utils/className";
import {
  resolveIconByTreeItemType,
  resolveIconFeedbackStatusComponent,
} from "../../utils/iconResolver";
import { Fade } from "@src/commons/components/Fade";

type TreeAssetsNodeProps = {
  item: TreeItem;
  hasExpandableItems: boolean;
  level?: number;
};

const LEVEL_IDENT_MULTIPLIER = 1.5;

export const TreeAssetsNode = ({
  item,
  hasExpandableItems,
  level = 1,
}: TreeAssetsNodeProps) => {
  const { expandable, open, toggleOpen } = useTreeAssetsNodeController(item);
  const icon = resolveIconByTreeItemType(item.type);
  const feedbackIcon = resolveIconFeedbackStatusComponent(item);
  const paddingLeft = LEVEL_IDENT_MULTIPLIER * 0.5 * level;

  return (
    <div className="flex flex-col">
      <button
        className={cn(
          "flex items-center gap-1 cursor-pointer hover:bg-[#f0f4f7] p-1 rounded",
          !expandable && hasExpandableItems ? "pl-0" : `pl-[${paddingLeft}rem]`
        )}
        onClick={toggleOpen}
      >
        {expandable && <Arrow up={!open} />}
        {icon}
        <span className="text-[#17192D] text-sm px-1">{item.name}</span>
        {feedbackIcon}
      </button>
      {item.children && item.children.length > 0 && (
        <Fade in={open}>
          <div className="pl-4">
            {item.children.map((child) => (
              <TreeAssetsNode
                key={child.id}
                item={child}
                hasExpandableItems={hasExpandableItems}
                level={level + 1}
              />
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};
