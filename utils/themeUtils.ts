const themeUtils = {
  // 라이트 모드
  setLight: (setTheme: Function) => {
    document.documentElement.setAttribute("data-theme", "Light");
    localStorage.setItem("theme", "Light");
    setTheme("Light");
  },

  // 다크 모드
  setDark: (setTheme: Function) => {
    document.documentElement.setAttribute("data-theme", "Dark");
    localStorage.setItem("theme", "Dark");
    setTheme("Dark");
  },

  // 다크 모드
  toggleTheme: (setTheme: Function) => {
    console.log(111);
    const curTheme = localStorage.getItem("theme");
    const nextTheme = curTheme === "Dark" ? "Light" : "Dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  },

  test: () => {
    console.log("test");
  },
};

export default themeUtils;
