import styled from "@emotion/styled";
import React, { useEffect } from "react";

import Text from "@/components/shared/Text";
import { GITHUB_URL, INQUIRY_URL } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import useModal from "@/hooks/useModal";
import useTheme from "@/hooks/useTheme";
import useTrackEvent from "@/hooks/useTrackEvent";
import ForwardSvg from "@/images/arrow_forward_ios.svg";
import PaintSvg from "@/images/color_lens.svg";
import EmailSvg from "@/images/mail_outline.svg";
import GithubSvg from "@/images/social/github.svg";
import SubjectSvg from "@/images/subject.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import Theme from "@/shared/Theme";

const SettingsModal = () => {
  const { setClusters, setTasks } = useLocalStorage();
  const { toggleTheme } = useTheme();
  const { openConfirm, openTOSModal, closeModal } = useModal();
  const { trackClickBtn, trackClickLink, trackViewModal } = useTrackEvent();

  useEffect(() => {
    trackViewModal("Settings");
  }, []);

  // 테마 변경
  const changeTheme = () => {
    trackClickBtn("ChangeTheme");
    toggleTheme();
    closeModal();
  };

  // 데이터 초기화
  const resetData = () => {
    trackClickBtn("ResetData");
    openConfirm({
      title: "Reset data",
      message: `Do you want to reset\n your data?`,
      onRequestConfirm: () => {
        setClusters([]);
        setTasks([]);
      },
    });
  };

  // 문의하기
  const inquiry = () => {
    trackClickLink("Inquiry");
    window.open(INQUIRY_URL, "_blank");
  };

  // 서비스 이용 약관
  const termsOfService = () => {
    trackClickBtn("TermsOfService");
    openTOSModal();
  };

  // 깃허브
  const github = () => {
    trackClickLink("Github");
    window.open(GITHUB_URL, "_blank");
  };

  return (
    <Wrapper>
      <Container>
        <Text s12 medium color="var(--sub)">
          Task
        </Text>
        <ListContainer>
          <List onClick={changeTheme}>
            <Content>
              <PaintSvg></PaintSvg>
              <Text s12>Theme</Text>
            </Content>
            <Theme className="fill-sub"></Theme>
          </List>
          <List onClick={resetData}>
            <Content>
              <TrashCanSvg></TrashCanSvg>
              <Text s12>Reset data</Text>
            </Content>
            <ForwardSvg className="fill-sub"></ForwardSvg>
          </List>
        </ListContainer>
      </Container>

      <Container>
        <Text s12 medium color="var(--sub)">
          About service
        </Text>
        <ListContainer>
          <List onClick={inquiry}>
            <Content>
              <EmailSvg></EmailSvg>
              <Text s12>Inquiry</Text>
            </Content>
            <ForwardSvg className="fill-sub"></ForwardSvg>
          </List>
          <List onClick={termsOfService}>
            <Content>
              <SubjectSvg></SubjectSvg>
              <Text s12>Terms of service</Text>
            </Content>
            <ForwardSvg className="fill-sub"></ForwardSvg>
          </List>
          <List onClick={github}>
            <Content>
              <GithubSvg></GithubSvg>
              <Text s12>Github</Text>
            </Content>
            <ForwardSvg className="fill-sub"></ForwardSvg>
          </List>
        </ListContainer>
      </Container>
    </Wrapper>
  );
};

export default SettingsModal;

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
  padding-bottom: 40px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ListContainer = styled.div`
  display: grid;
  gap: 4px;
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
  border-radius: 10px;
  user-select: none;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
