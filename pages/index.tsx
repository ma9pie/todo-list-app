import styled from "@emotion/styled";
import type { ReactElement } from "react";

import HomeLayout from "@/layouts/HomeLayout";

export default function Home() {
  return <Wrapper></Wrapper>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

const Wrapper = styled.div``;
