"use client";

import { useSyncExternalStore } from "react";
import {
  resolveTheme,
  THEMES,
  THEME_KEY,
  type ThemeId,
} from "@/lib/theme";

const THEME_CHANGE_EVENT = "7habit-theme-change";

function applyTheme(theme: ThemeId) {
  if (theme === "paper") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

function getThemeSnapshot() {
  return resolveTheme(document.documentElement.dataset.theme ?? null, null);
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "paper");

  function selectTheme(nextTheme: ThemeId) {
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {}
  }

  return (
    <div aria-label="阅读主题" className="fixed top-3 right-3 z-50 flex gap-1 rounded-full border border-line bg-paper p-1 shadow-sm">
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={theme === option.id}
          onClick={() => selectTheme(option.id)}
          className="rounded-full px-3 py-1 text-sm text-ink aria-pressed:bg-pine aria-pressed:text-paper"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
