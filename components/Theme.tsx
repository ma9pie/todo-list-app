import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import MoonSvg from "@/images/bedtime.svg";
import SunSvg from "@/images/wb_sunny.svg";
import themeUtils from "@/utils/themeUtils";

const Theme = () => {
  const [theme, setTheme] = useState("Light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "Light") {
      themeUtils.setLight(setTheme);
    } else {
      themeUtils.setDark(setTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "Dark") {
      themeUtils.setLight(setTheme);
    } else {
      themeUtils.setDark(setTheme);
    }
  };

  return (
    <Wrapper onClick={toggleTheme}>
      {theme === "Light" && <SunSvg></SunSvg>}
      {theme === "Dark" && <MoonSvg></MoonSvg>}
    </Wrapper>
  );
};

export default Theme;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
