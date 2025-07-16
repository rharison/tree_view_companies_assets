import { createContext, useContext, useState } from "react";

type TreeViewAssetsContextProps = {
  selectedCompanyId: string | null;
  handleSelectCompany: (companyId: string) => void;
};

type TreeViewAssetsProviderProps = {
  children: React.ReactNode;
};

const TreeViewAssetsContext = createContext<TreeViewAssetsContextProps | null>(
  null
);

export function TreeViewAssetsProvider({
  children,
}: TreeViewAssetsProviderProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );

  function handleSelectCompany(companyId: string) {
    setSelectedCompanyId(companyId);
  }

  return (
    <TreeViewAssetsContext.Provider
      value={{ selectedCompanyId, handleSelectCompany }}
    >
      {children}
    </TreeViewAssetsContext.Provider>
  );
}

export const useTreeViewAssetsFormContext = () => {
  const context = useContext(TreeViewAssetsContext);

  if (!context) {
    throw new Error(
      "useTreeViewAssetsFormContext must be used within a TreeViewAssetsProvider"
    );
  }

  return context;
};
