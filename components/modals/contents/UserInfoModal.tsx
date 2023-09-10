import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect } from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import Button from "@/components/shared//buttons";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import useTrackEvent from "@/hooks/useTrackEvent";

const UserInfoModal = () => {
  const { email, name, image, logout } = useLogin();
  const { closeModal } = useModal();
  const { trackClickBtn, trackViewModal } = useTrackEvent();

  useEffect(() => {
    trackViewModal("UserInfo");
  }, []);

  const handleClick = () => {
    trackClickBtn("Logout");
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
            <Image
              src={image}
              fill
              priority
              sizes="32px"
              alt="user_image"
            ></Image>
          </ImageWrapper>
        )}
        <Text s14>{name}</Text>
      </FlexRow>
      <Spacing size={8}></Spacing>
      <Text s12>{`email : ${email}`}</Text>
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
