import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "app-theme";
const TRANSITION_MS = 280;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// SSR-safe layout effect
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function readInitialTheme(): { theme: Theme; userChose: boolean } {
  if (typeof window === "undefined") return { theme: "dark", userChose: false };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      return { theme: stored, userChose: true };
    }
  } catch {
    /* ignore */
  }
  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return { theme: prefersLight ? "light" : "dark", userChose: false };
}

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initial = useRef(readInitialTheme());
  const [theme, setThemeState] = useState<Theme>(initial.current.theme);
  const userChoseRef = useRef(initial.current.userChose);
  const firstRun = useRef(true);
  const clearTimer = useRef<number | null>(null);

  // Apply theme before paint to avoid flash
  useIsoLayoutEffect(() => {
    applyThemeToDocument(theme);

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // Smooth cross-theme transition
    const root = document.documentElement;
    root.dataset.themeSwitching = "true";
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => {
      delete root.dataset.themeSwitching;
      clearTimer.current = null;
    }, TRANSITION_MS);

    return () => {
      if (clearTimer.current) {
        window.clearTimeout(clearTimer.current);
        clearTimer.current = null;
      }
    };
  }, [theme]);

  // Follow OS preference until the user makes an explicit choice
  useEffect(() => {
    if (userChoseRef.current) return;
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      if (userChoseRef.current) return;
      setThemeState(e.matches ? "light" : "dark");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    userChoseRef.current = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
