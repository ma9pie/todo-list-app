import styled from "@emotion/styled";
import { signIn } from "next-auth/react";
import React from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import GithubleSvg from "@/images/github.svg";
import GoogleSvg from "@/images/google.svg";

const LoginModal = () => {
  return (
    <Wrapper>
      <ModalHeader title="Login"></ModalHeader>

      <ListContainer>
        <List onClick={() => signIn("google")}>
          <GoogleSvg></GoogleSvg>
          <Text>Google</Text>
        </List>
        <List onClick={() => signIn("github")}>
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
