import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TreeViewAssets } from "./features/Companies/TreeViewAssets/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TreeViewAssets />
  </StrictMode>
);
