import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Assets } from "@src/features/Companies/Assets";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Assets />
  </StrictMode>
);
