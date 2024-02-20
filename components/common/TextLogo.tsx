import Link from "next/link";
import React from "react";

import Text from "@/components/common/Text";
import useTrackEvent from "@/hooks/useTrackEvent";

const TextLogo = () => {
  const { trackClickLink } = useTrackEvent();

  return (
    <Link href="/" onClick={() => trackClickLink("Home")}>
      <Text s24 bold>
        TODO
      </Text>
    </Link>
  );
};

export default TextLogo;
