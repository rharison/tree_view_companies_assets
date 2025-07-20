import { cn } from "@src/commons/utils/className";

type FilterButtonProps = {
  icon: React.ReactNode;
  label: string;
  className?: string;
  active: boolean;
  onClick: () => void;
};

export const FilterButton = ({
  icon,
  className,
  label,
  active,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-8 py-[6px] px-4 text-sm rounded-[3px] flex items-center gap-2 cursor-pointer border border-[#D8DFE6] text-[#77818C]",
        className,
        active && "bg-[#2188FF] text-white border-none"
      )}
    >
      {icon}
      {label}
    </button>
  );
};
