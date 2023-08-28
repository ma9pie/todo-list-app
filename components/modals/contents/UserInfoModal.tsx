import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import Button from "@/components/shared//buttons";
import Spacing from "@/components/shared/Spacing";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";

const UserInfoModal = () => {
  const { email, name, image, logout } = useLogin();
  const { closeModal } = useModal();

  const handleClick = () => {
    logout();
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title="User info"></ModalHeader>
      <Spacing size={16}></Spacing>
      <FlexRow>
        {image && (
          <ImageWrapper>
            <Image src={image} fill priority alt="user_image"></Image>
          </ImageWrapper>
        )}
        <Text>{name}</Text>
      </FlexRow>
      <Spacing size={8}></Spacing>
      <SubText>{`email : ${email}`}</SubText>
      <Spacing size={48}></Spacing>
      <Button full onClick={handleClick}>
        Logout
      </Button>
    </Wrapper>
  );
};

export default UserInfoModal;

const Wrapper = styled.div``;
const ImageWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;
const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Text = styled.p`
  font: var(--medium14);
`;
const SubText = styled.p`
  font: var(--medium12);
`;
