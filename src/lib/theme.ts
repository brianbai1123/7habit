export const THEME_KEY = "7habit:theme";

export const THEMES = [
  { id: "paper", label: "纸白" },
  { id: "celadon", label: "青瓷" },
  { id: "night", label: "夜读" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

function isTheme(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function resolveTheme(
  queryTheme: string | null,
  storedTheme: string | null,
): ThemeId {
  if (isTheme(queryTheme)) return queryTheme;
  if (isTheme(storedTheme)) return storedTheme;
  return "paper";
}

export const THEME_BOOTSTRAP_SCRIPT = `(() => {
  const themes = ${JSON.stringify(THEMES.map(({ id }) => id))};
  const valid = (theme) => themes.includes(theme);
  const query = new URLSearchParams(location.search).get("theme");
  let stored = null;

  try {
    stored = localStorage.getItem(${JSON.stringify(THEME_KEY)});
  } catch {}

  const theme = valid(query) ? query : valid(stored) ? stored : "paper";

  if (valid(query)) {
    try {
      localStorage.setItem(${JSON.stringify(THEME_KEY)}, query);
    } catch {}
  }

  if (theme === "paper") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
})();`;
