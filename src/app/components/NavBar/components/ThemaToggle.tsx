"use client";

import { useEffect, FC } from "react";

interface ThemeProps {
    theme: string,
    setTheme: (value: string) => void
}

export const ThemeToggle: FC<ThemeProps> = ({ theme, setTheme }) => {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-10 h-10 flex items-center justify-center rounded-full border border-secondary dark:border-gray-600  dark:bg-gray-800 transition-colors duration-500 hover:scale-105 shadow-md"
    >
      <span className="absolute inset-0 flex items-center justify-center transition-opacity  duration-500 group-hover:opacity-0">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-bold text-secondary dark:text-gray-300">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
};
