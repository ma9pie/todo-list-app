import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import UserSvg from "@/images/user.svg";

const LoginBadge = () => {
  const { user, image } = useLogin();
  const { openLoginModal, openUserInfoModal } = useModal();

  return (
    <Wrapper>
      {!user ? (
        <UserSvg className="fill-sub" onClick={openLoginModal}></UserSvg>
      ) : image ? (
        <Box onClick={openUserInfoModal}>
          <ImageWrapper>
            <Image src={image} fill priority alt="user_image"></Image>
          </ImageWrapper>
        </Box>
      ) : (
        <UserSvg className="fill-main" onClick={openUserInfoModal}></UserSvg>
      )}
    </Wrapper>
  );
};

export default LoginBadge;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
`;
