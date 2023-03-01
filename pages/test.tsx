import { css } from "@emotion/css";
import styled from "@emotion/styled";

import Theme from "@/components/Theme";
import Check from "@/images/check.svg";

export default function Test() {
  return (
    <Wrapper>
      <Check></Check>
      <Theme></Theme>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
