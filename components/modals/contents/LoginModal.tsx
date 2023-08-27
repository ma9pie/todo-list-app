import styled from "@emotion/styled";
import React from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import useLogin from "@/hooks/useLogin";
import GithubleSvg from "@/images/social/github.svg";
import GoogleSvg from "@/images/social/google.svg";

const LoginModal = () => {
  const { googleLogin, githubLogin } = useLogin();

  return (
    <Wrapper>
      <ModalHeader title="Login"></ModalHeader>

      <ListContainer>
        <List onClick={googleLogin}>
          <GoogleSvg></GoogleSvg>
          <Text>Google</Text>
        </List>
        <List onClick={githubLogin}>
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
