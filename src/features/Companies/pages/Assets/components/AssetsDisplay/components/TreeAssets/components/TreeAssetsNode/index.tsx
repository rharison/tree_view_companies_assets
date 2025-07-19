import Arrow from "@src/assets/icons/Arrow";
import { Fade } from "@src/commons/components/Fade";
import type { TreeItem } from "@src/commons/types/tree-view-assets";
import { cn } from "@src/commons/utils/className";
import {
  resolveIconByTreeItemType,
  resolveIconFeedbackStatusComponent,
} from "../../utils/iconResolver";
import { useTreeAssetsNodeController } from "./hooks/useTreeAssetsNodeController";

type TreeAssetsNodeProps = {
  item: TreeItem;
  hasExpandableItems: boolean;
  level?: number;
};

const IDENTITY_SIZE_PIXEL = 14;

export const TreeAssetsNode = ({
  item,
  hasExpandableItems,
  level = 1,
}: TreeAssetsNodeProps) => {
  const { expandable, hasChildren, open, handleClickTreeItem } =
    useTreeAssetsNodeController(item);

  const icon = resolveIconByTreeItemType(item.type);
  const feedbackIcon = resolveIconFeedbackStatusComponent(item);

  return (
    <div className="flex flex-col">
      <button
        className={cn(
          "flex items-center gap-1 cursor-pointer hover:bg-[#f0f4f7] p-1 rounded",
          !expandable && hasExpandableItems ? "pl-1" : `pl-2`
        )}
        onClick={() => handleClickTreeItem(item)}
      >
        {expandable && <Arrow up={!open} />}
        {icon}
        <span className="text-[rgba(0, 0, 0, 0.06)] text-sm px-1">
          {item.name}
        </span>
        {feedbackIcon}
      </button>

      {hasChildren && (
        <Fade in={open}>
          <div
            style={{
              marginLeft: `${IDENTITY_SIZE_PIXEL * level}px`,
            }}
          >
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
