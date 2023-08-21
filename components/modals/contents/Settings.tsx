import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import ForwardSvg from "@/images/arrow_forward_ios.svg";
import CloudDownloadSvg from "@/images/cloud_download.svg";
import PaintSvg from "@/images/color_lens.svg";
import GithubSvg from "@/images/github.svg";
import EmailSvg from "@/images/mail_outline.svg";
import SubjectSvg from "@/images/subject.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import TermsAndConditions from "@/modals/contents/TermsAndConditions";
import Theme from "@/shared/Theme";
import { setDark, setLight } from "@/utils";

const SUB_COLOR = css`
  path {
    fill: var(--sub);
  }
`;

const Settings = () => {
  const router = useRouter();

  const { setClusters, setTasks } = useTodo();
  const { openAlert, openConfirm, openBottomSheet, closeModal } = useModal();

  const [theme, setTheme] = useState("Light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "Light") {
      setLight(setTheme);
    } else {
      setDark(setTheme);
    }
  }, []);

  // 테마 변경
  const toggleTheme = () => {
    if (theme === "Dark") {
      setLight(setTheme);
    } else {
      setDark(setTheme);
    }
    closeModal("settings");
  };

  // 백업 및 가져오기
  const backupAndRestore = () => {
    openAlert({
      message: "구글 계정 연동 개발 예정",
    });
  };

  // 데이터 초기화
  const resetData = () => {
    openConfirm({
      message: "데이터를 초기화 하시겠습니까?",
      onRequestConfirm: () => {
        setClusters([]);
        setTasks([]);
      },
    });
  };

  // 문의하기
  const inquiry = () => {
    window.open(
      "https://docs.google.com/forms/d/1eE3KBOtAmtNh5cLHlGyrZC7q5I_rvG0TxwaJ16UiuvI",
      "_blank"
    );
  };

  // 이용약관
  const termsAndCondition = () => {
    openBottomSheet({
      title: "이용약관",
      component: TermsAndConditions,
    });
  };

  // 깃허브
  const github = () => {
    window.open("https://github.com/ma9pie/todo-list", "_blank");
  };

  return (
    <Wrapper>
      <Container>
        <Subtitle>Task</Subtitle>
        <ListContainer>
          <List onClick={toggleTheme}>
            <Content>
              <PaintSvg></PaintSvg>
              <ListTitle>Theme</ListTitle>
            </Content>
            <Theme className={SUB_COLOR} theme={theme}></Theme>
          </List>
          <List onClick={backupAndRestore}>
            <Content>
              <CloudDownloadSvg></CloudDownloadSvg>
              <ListTitle>Backup / Restore</ListTitle>
            </Content>
            <ForwardSvg className={SUB_COLOR}></ForwardSvg>
          </List>
          <List onClick={resetData}>
            <Content>
              <TrashCanSvg></TrashCanSvg>
              <ListTitle>Reset data</ListTitle>
            </Content>
            <ForwardSvg className={SUB_COLOR}></ForwardSvg>
          </List>
        </ListContainer>
      </Container>

      <Container>
        <Subtitle>About service</Subtitle>
        <ListContainer>
          <List onClick={inquiry}>
            <Content>
              <EmailSvg></EmailSvg>
              <ListTitle>Inquiry</ListTitle>
            </Content>
            <ForwardSvg className={SUB_COLOR}></ForwardSvg>
          </List>
          <List onClick={termsAndCondition}>
            <Content>
              <SubjectSvg></SubjectSvg>
              <ListTitle>Terms & Condition</ListTitle>
            </Content>
            <ForwardSvg className={SUB_COLOR}></ForwardSvg>
          </List>
          <List onClick={github}>
            <Content>
              <GithubSvg></GithubSvg>
              <ListTitle>Github</ListTitle>
            </Content>
            <ForwardSvg className={SUB_COLOR}></ForwardSvg>
          </List>
        </ListContainer>
      </Container>
    </Wrapper>
  );
};

export default Settings;

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
  padding-bottom: 40px;
`;
const Container = styled.div``;
const Subtitle = styled.p`
  font: var(--medium12);
  color: var(--sub);
  margin-bottom: 8px;
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
  cursor: pointer;
  user-select: none;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const ListTitle = styled.p`
  font: var(--normal12);
`;
