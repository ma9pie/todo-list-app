import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

import useTrackEvent from "@/hooks/useTrackEvent";

const TextLogo = () => {
  const { trackClickLink } = useTrackEvent();

  return (
    <Link href="/" onClick={() => trackClickLink("Home")}>
      <Text>TODO</Text>
    </Link>
  );
};

export default TextLogo;

const Text = styled.h1`
  font: var(--bold24);
`;
