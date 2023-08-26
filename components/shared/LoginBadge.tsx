import styled from "@emotion/styled";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import useModal from "@/hooks/useModal";
import UserSvg from "@/images/user.svg";

const LoginBadge = () => {
  const { data: session } = useSession();
  const { openConfirm, openLoginModal } = useModal();

  const handleClick = () => {
    if (!session) {
      return openLoginModal();
    } else {
      openConfirm({
        title: "Logout",
        message: "로그아웃 하시겠습니까?",
        onRequestConfirm: signOut,
      });
    }
  };

  return (
    <Wrapper>
      {session && <Text>{session?.user?.email}</Text>}
      <UserSvg
        className={session ? "fill-main" : "fill-sub"}
        onClick={handleClick}
      ></UserSvg>
    </Wrapper>
  );
};

export default LoginBadge;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Text = styled.p`
  font: var(--medium12);
`;
