import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";
import ProcessTest from "@/components/test/process";
import useModal from "@/hooks/useModal";
import Button from "@/shared/buttons/index";
import { ToastStatus } from "@/types";

function Components() {
  const { openModal, openAlert, openConfirm, openBottomSheet, openToast } =
    useModal();

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Content>
        <Title>Test</Title>
        <Button
          onClick={() => {
            openModal({
              key: "ProcessTest",
              component: () => <ProcessTest></ProcessTest>,
            });
          }}
        >
          ProcessTest
        </Button>
      </Content>
      <Content>
        <Title>Alert</Title>
        <Button
          onClick={() =>
            openAlert({
              title: "Alert",
              message: `message\n message\n message`,
              confirmBtnText: "yes",
              onAfterOpen: () => {
                console.log("onAfterOpen");
              },
              onAfterClose: () => {
                console.log("onAfterClose");
              },
            })
          }
        >
          Alert
        </Button>
        <Button
          onClick={() =>
            openAlert({
              component: () => <TestComponent></TestComponent>,
            })
          }
        >
          Component Alert
        </Button>
      </Content>

      <Content>
        <Title>Confirm</Title>
        <Button
          onClick={() =>
            openConfirm({
              title: "Confirm",
              message: `message\n message\n message`,
              confirmBtnText: "yes",
              cancleBtnText: "no",
              onAfterOpen: () => {
                console.log("onAfterOpen");
              },
              onAfterClose: () => {
                console.log("onAfterClose");
              },
              onRequestConfirm: () => {
                console.log("onRequestConfirm");
              },
            })
          }
        >
          Confirm
        </Button>
        <Button
          onClick={() =>
            openConfirm({
              component: () => <TestComponent></TestComponent>,
            })
          }
        >
          Component Confirm
        </Button>
      </Content>

      <Content>
        <Title>Toast</Title>
        <Button
          onClick={() => {
            openToast({
              status: ToastStatus.Success,
              message: "장바구니에 등록되었습니다.",
            });
          }}
        >
          Success Toast
        </Button>
        <Button
          onClick={() => {
            openToast({
              status: ToastStatus.Error,
              message: "상품 정보가 존재하지 않습니다.",
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          onClick={() => {
            openToast({
              status: ToastStatus.Warn,
              message: "로그인 후 이용해주세요.",
            });
          }}
        >
          Warn Toast
        </Button>
        <Button
          onClick={() => {
            openToast({
              message: `해당 이벤트는 종료된 이벤트 입니다.\n 공지사항을 확인해주세요.`,
            });
          }}
        >
          Message 2 lines Toast
        </Button>
      </Content>

      <Content>
        <Title>Bottom Sheet</Title>
        <Button
          onClick={() => {
            openBottomSheet({ title: "Setting" });
          }}
        >
          BottomSheet
        </Button>
        <Button
          onClick={() => {
            openBottomSheet({
              component: () => {
                return <TestComponent></TestComponent>;
              },
            });
          }}
        >
          Component BottomSheet
        </Button>
        <Button
          onClick={() => {
            openBottomSheet({ height: "50%" });
          }}
        >
          BottomSheet 50%
        </Button>
        <Button
          onClick={() => {
            openBottomSheet({ height: "100%" });
          }}
        >
          BottomSheet 100%
        </Button>
      </Content>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.p`
  font: var(--bold18);
`;

const TestComponent = () => {
  const TextBox = styled.div`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    padding: 16px;
    background-color: var(--box);
    & * {
      background-color: inherit;
    }
  `;
  const Text = styled.p`
    font: var(--medium14);
  `;

  return (
    <TextBox>
      <Text>내용 1</Text>
      <Text>내용 2</Text>
      <Text>내용 3</Text>
      <Text>내용 4</Text>
    </TextBox>
  );
};
