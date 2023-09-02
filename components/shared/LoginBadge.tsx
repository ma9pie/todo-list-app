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
        <Box onClick={openLoginModal}>
          <UserSvg className="fill-sub" width={32} height={32}></UserSvg>
        </Box>
      ) : image ? (
        <Box onClick={openUserInfoModal}>
          <ImageWrapper>
            <Image src={image} fill sizes="32px" alt="user_image"></Image>
          </ImageWrapper>
        </Box>
      ) : (
        <Box onClick={openUserInfoModal}>
          <UserSvg className="fill-main"></UserSvg>
        </Box>
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--sectionLine);
  overflow: hidden;
`;
