import type { TreeItem } from "@src/commons/types/tree-view-assets";

type AssetDetailsProps = {
  item: TreeItem | null;
};

export const AssetDetails = ({ item }: AssetDetailsProps) => {
  return (
    <div className="flex flex-col w-full h-full border border-[#D8DFE6] rounded-[2px]">
      <header className="h-[45px] border-b border-[#D8DFE6] flex items-center px-4 py-3.5">
        <span className="text-[#24292F] font-semibold">{item?.name}</span>
      </header>
    </div>
  );
};
