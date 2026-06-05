import React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import ChaiHolistic from "./chaiholistic417";
// @ts-ignore
import ComingSoon from "./ComingSoon";

const PREVIEW_KEY = "chai_preview_2026";

const isPreview = (() => {
  try {
    if (window.location.search.includes("preview=sipheal")) {
      localStorage.setItem(PREVIEW_KEY, "true");
      return true;
    }
    if (localStorage.getItem(PREVIEW_KEY) === "true") return true;
    return false;
  } catch {
    return false;
  }
})();

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    {isPreview ? <ChaiHolistic /> : <ComingSoon />}
  </React.StrictMode>
);
