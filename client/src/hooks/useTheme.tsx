import {
  useEffect,
  useState,
} from 'react';

type ThemeType = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return (savedTheme as ThemeType) || "dark";
  });

  useEffect(() => {
   
    document.body.classList.remove("dark-theme", "light-theme");

   
    document.body.classList.add(
      theme === "dark" ? "dark-theme" : "light-theme"
    );

 
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};
