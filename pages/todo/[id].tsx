import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

import PageLayout from "@/components/layouts/PageLayout";
import useTodo from "@/hooks/useTodo";

const Todo = () => {
  const router = useRouter();

  const { clusters } = useTodo();

  const [id, setId] = useState<any>("");

  useEffect(() => {
    console.log(clusters);
  }, []);

  useEffect(() => {
    setId(router.query.id);
  }, [router.query]);

  return <Wrapper>{id}</Wrapper>;
};

export default Todo;

Todo.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

const Wrapper = styled.div``;
