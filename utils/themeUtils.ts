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
};

export default themeUtils;
