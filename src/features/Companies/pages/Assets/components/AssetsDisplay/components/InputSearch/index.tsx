import Search from "@src/assets/icons/Search";
import { useAssetsContext } from "../../../../contexts/AssetsContext";

export const InputSearch = () => {
  const { handleSearch } = useAssetsContext();

  return (
    <div className="relative w-full">
      <input
        id="search-input"
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="w-full h-[45px] p-2 border-b border-[#D8DFE6] focus:outline-none placeholder-[#C1C9D2] placeholder:text-sm px-3"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
};
