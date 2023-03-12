import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PageLayout from "@/layouts/PageLayout";

const Todo = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  return <Wrapper></Wrapper>;
};

export default Todo;

Todo.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

const Wrapper = styled.div``;
