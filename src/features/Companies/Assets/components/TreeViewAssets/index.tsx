import Search from "@src/assets/icons/Search";

export const TreeViewAssets = () => {
  return (
    <div className="flex flex-col w-[40%] h-full border border-[#D8DFE6] rounded-[2px]">
      <div className="relative w-full">
        <input
          id="search-input"
          type="text"
          placeholder="Buscar Ativo ou Local"
          className="w-full h-[45px] p-2 border-b border-[#D8DFE6] focus:outline-none placeholder-[#C1C9D2] placeholder:text-sm px-3"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
