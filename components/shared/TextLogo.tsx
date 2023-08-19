import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const TextLogo = () => {
  return (
    <Link href="/">
      <Text>TODO</Text>
    </Link>
  );
};

export default TextLogo;

const Text = styled.h1`
  font: var(--bold24);
`;
