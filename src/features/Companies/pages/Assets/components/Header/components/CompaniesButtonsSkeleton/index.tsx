export const CompaniesButtonsSkeleton = () => {
  return (
    <div className="flex gap-[10px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`companie_button_skeleton_${index}`}
          className="bg-gray-500 h-6 w-[78px] animate-pulse rounded-[2px] flex items-center justify-center"
        ></div>
      ))}
    </div>
  );
};
