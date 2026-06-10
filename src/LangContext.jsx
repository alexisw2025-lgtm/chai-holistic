/**
 * LangContext.jsx
 * Chai Holistic — Global Language Context
 *
 * Provides { T, lang } to every component via useContext(LangContext).
 * No prop drilling needed. Any component can call:
 *
 *   import { useLang } from "./LangContext";
 *   const { T, lang } = useLang();
 *
 * The LangProvider wraps the app in chaiholistic417.jsx:
 *   <LangProvider lang={lang}>
 *     <App .../>
 *   </LangProvider>
 */

import { createContext, useContext } from "react";

export const LangContext = createContext({ T: {}, lang: "en" });

export function LangProvider({ lang, T, children }) {
  return (
    <LangContext.Provider value={{ T, lang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
