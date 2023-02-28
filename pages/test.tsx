import { css } from "@emotion/css";
import styled from "@emotion/styled";

import Check from "@/images/check.svg";
import Theme from "@/shared/Theme";

export default function Test() {
  return (
    <Wrapper>
      <Check></Check>
      <Theme></Theme>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
