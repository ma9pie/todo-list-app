import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import TestLayout from "@/components/layouts/TestLayout";
import ProcessTest from "@/components/test/process";
import RecoilComponent from "@/components/test/RecoilComponent";
import useModal, { modalUtils } from "@/hooks/useModal";
import { testState } from "@/recoil/atoms";
import Button from "@/shared/buttons/index";
import { ToastStatus } from "@/types";

function Components() {
  const modal = useModal();
  const [test, setTest] = useRecoilState(testState);

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Content>
        <Title>Test</Title>
        <Button
          onClick={() => {
            modal.openModal({
              key: "ProcessTest",
              component: () => <ProcessTest></ProcessTest>,
            });
          }}
        >
          ProcessTest
        </Button>
        <Button
          onClick={() => {
            modal.openModal({
              component: () => <RecoilComponent></RecoilComponent>,
            });
          }}
        >
          RecoilComponent
        </Button>
        <Button
          onClick={() => {
            setTest(test + 1);
          }}
        >
          +1
        </Button>
      </Content>
      <Content>
        <Title>Alert</Title>
        <Button
          onClick={() =>
            modal.openAlert({
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
            modal.openAlert({
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
            modal.openConfirm({
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
            modal.openConfirm({
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
            modal.openToast({
              status: ToastStatus.Success,
              message: "장바구니에 등록되었습니다.",
            });
          }}
        >
          Success Toast
        </Button>
        <Button
          onClick={() => {
            modal.openToast({
              status: ToastStatus.Error,
              message: "상품 정보가 존재하지 않습니다.",
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          onClick={() => {
            modal.openToast({
              status: ToastStatus.Warn,
              message: "로그인 후 이용해주세요.",
            });
          }}
        >
          Warn Toast
        </Button>
        <Button
          onClick={() => {
            modal.openToast({
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
            modal.openBottomSheet({ title: "Setting" });
          }}
        >
          BottomSheet
        </Button>
        <Button
          onClick={() => {
            modal.openBottomSheet({
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
            modal.openBottomSheet({ height: "50%" });
          }}
        >
          BottomSheet 50%
        </Button>
        <Button
          onClick={() => {
            modal.openBottomSheet({ height: "100%" });
          }}
        >
          BottomSheet 100%
        </Button>
      </Content>

      <Content>
        <Title>ModalUtils</Title>
        <Button
          onClick={() => {
            modalUtils.openModal({
              component: () => <TestComponent></TestComponent>,
            });
          }}
        >
          openModal
        </Button>
        <Button onClick={() => modalUtils.openAlert({})}>openAlert</Button>
        <Button onClick={() => modalUtils.openConfirm({})}>openConfirm</Button>
        <Button onClick={() => modalUtils.openToast({})}>openToast</Button>
        <Button onClick={() => modalUtils.openBottomSheet({})}>
          openBottomSheet
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
