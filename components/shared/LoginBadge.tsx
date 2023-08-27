import styled from "@emotion/styled";
import React from "react";

import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import UserSvg from "@/images/user.svg";

const LoginBadge = () => {
  const { user, logout } = useLogin();
  const { openConfirm, openLoginModal } = useModal();

  const handleClick = () => {
    if (!user) {
      return openLoginModal();
    } else {
      openConfirm({
        title: "Logout",
        message: "로그아웃 하시겠습니까?",
        onRequestConfirm: logout,
      });
    }
  };

  return (
    <Wrapper>
      {user && <Text>{user.email}</Text>}
      <UserSvg
        className={user ? "fill-main" : "fill-sub"}
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
