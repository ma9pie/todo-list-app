import styled from "@emotion/styled";
import type { ReactElement } from "react";

import HomeLayout from "@/layouts/HomeLayout";
export default function Home() {
  return (
    <Wrapper>
      <TestButton
        onClick={() => alert("onClick")}
        onTouchEnd={() => alert("onTouchEnd")}
      ></TestButton>
    </Wrapper>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

const Wrapper = styled.div``;
const TestButton = styled.button`
  width: 40px;
  height: 24px;
`;
