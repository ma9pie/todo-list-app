import { useRecoilState } from "recoil";

import { themeState } from "@/recoil/atoms";

const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const setLight = () => {
    document.documentElement.setAttribute("data-theme", "Light");
    localStorage.setItem("theme", "Light");
  };

  const setDark = () => {
    document.documentElement.setAttribute("data-theme", "Dark");
    localStorage.setItem("theme", "Dark");
  };

  const toggleTheme = () => {
    const curTheme = localStorage.getItem("theme");
    const nextTheme = curTheme === "Dark" ? "Light" : "Dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return { theme, setTheme, setLight, setDark, toggleTheme };
};

export default useTheme;
