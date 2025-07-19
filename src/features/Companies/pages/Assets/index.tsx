import { AssetsDisplay } from "./components/AssetsDisplay";
import { Header } from "./components/Header";
import { CompanyProvider } from "../../contexts/CompanyContext";

export const Assets = () => {
  return (
    <CompanyProvider>
      <Header />
      <AssetsDisplay />
    </CompanyProvider>
  );
};
