import styled from "@emotion/styled";
import React from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import GithubleSvg from "@/images/social/github.svg";
import GoogleSvg from "@/images/social/google.svg";
import { LoginType } from "@/types";

const LoginModal = () => {
  const { googleLogin, githubLogin } = useLogin();
  const { closeModal } = useModal();

  const login = (type: LoginType) => {
    switch (type) {
      case LoginType.Google:
        googleLogin();
        closeModal();
        break;
      case LoginType.Github:
        githubLogin();
        closeModal();
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <ModalHeader title="Login"></ModalHeader>

      <ListContainer>
        <List onClick={() => login(LoginType.Google)}>
          <GoogleSvg></GoogleSvg>
          <Text>Google</Text>
        </List>
        <List onClick={() => login(LoginType.Github)}>
          <GithubleSvg></GithubleSvg>
          <Text>Github</Text>
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
const List = styled.div<any>`
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
const Text = styled.p`
  font: var(--medium16);
`;
