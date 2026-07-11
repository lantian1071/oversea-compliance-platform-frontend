import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "zh" | "en";

const storageKey = "chaintrack-language";

const languageLabels: Record<Language, string> = {
  zh: "中文",
  en: "English",
};

type LanguageContextValue = {
  language: Language;
  languageLabel: string;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "zh";
  const saved = window.localStorage.getItem(storageKey);
  return saved === "en" ? "en" : "zh";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      languageLabel: languageLabels[language],
      setLanguage,
      toggleLanguage: () => setLanguage(language === "zh" ? "en" : "zh"),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return value;
}

export function pick<T>(language: Language, value: { zh: T; en: T }) {
  return value[language];
}

