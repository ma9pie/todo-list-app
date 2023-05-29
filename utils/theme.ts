// 라이트 모드
export const setLight = (setTheme: Function) => {
  document.documentElement.setAttribute("data-theme", "Light");
  localStorage.setItem("theme", "Light");
  setTheme("Light");
};

// 다크 모드
export const setDark = (setTheme: Function) => {
  document.documentElement.setAttribute("data-theme", "Dark");
  localStorage.setItem("theme", "Dark");
  setTheme("Dark");
};

// 테마 토글
export const toggleTheme = (setTheme: Function) => {
  const curTheme = localStorage.getItem("theme");
  const nextTheme = curTheme === "Dark" ? "Light" : "Dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
};
