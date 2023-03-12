import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PageLayout from "@/layouts/PageLayout";
import { clusters, tasks } from "@/recoil/atom";

const Todo = () => {
  const router = useRouter();

  const [tmp, setTmp] = useRecoilState(clusters);

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  useEffect(() => {
    console.log(tmp);
  }, [tmp]);

  return <Wrapper></Wrapper>;
};

export default Todo;

Todo.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

const Wrapper = styled.div``;
