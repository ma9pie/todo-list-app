import styled from "@emotion/styled";
import React, { useEffect } from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import Text from "@/components/shared/Text";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import useTrackEvent from "@/hooks/useTrackEvent";
import GithubleSvg from "@/images/social/github.svg";
import GoogleSvg from "@/images/social/google.svg";
import { LoginType } from "@/types";

const LoginModal = () => {
  const { login } = useLogin();
  const { closeModal } = useModal();
  const { trackViewModal } = useTrackEvent();

  useEffect(() => {
    trackViewModal("Login");
  }, []);

  const handleLogin = (type: LoginType) => {
    login(type);
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title="Login"></ModalHeader>

      <ListContainer>
        <List onClick={() => handleLogin(LoginType.Google)}>
          <GoogleSvg></GoogleSvg>
          <Text medium>Google</Text>
        </List>
        <List onClick={() => handleLogin(LoginType.Github)}>
          <GithubleSvg></GithubleSvg>
          <Text medium>Github</Text>
        </List>
      </ListContainer>
    </Wrapper>
  );
};

export default LoginModal;

const Wrapper = styled.div``;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
  cursor: pointer;
`;
