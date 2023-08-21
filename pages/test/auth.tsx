import styled from "@emotion/styled";
import { signIn, signOut, useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";

function Components() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Wrapper>
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      </Wrapper>
    );
  }
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
