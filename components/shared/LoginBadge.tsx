import { signOut, useSession } from "next-auth/react";
import React from "react";

import useModal from "@/hooks/useModal";
import UserSvg from "@/images/user.svg";

const LoginBadge = () => {
  const { data: session } = useSession();
  const { openLoginModal } = useModal();

  return (
    <div>
      <UserSvg onClick={openLoginModal}></UserSvg>
    </div>
  );
};

export default LoginBadge;
