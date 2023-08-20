import styled from "@emotion/styled";
import React, { Fragment, useEffect, useState } from "react";

import Process1 from "@/components/test/process/Process1";
import Process2 from "@/components/test/process/Process2";
import Process3 from "@/components/test/process/Process3";
import useModal from "@/hooks/useModal";
import Header from "@/modals/Header";

const Process = () => {
  const { closeModal } = useModal();

  const [title, setTitle] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    switch (step) {
      case 0:
        setTitle("약관 동의");
        break;

      default:
        break;
    }
  }, [step]);

  const close = () => closeModal("ProcessTest");

  return (
    <Wrapper>
      {step === 0 && (
        <Fragment>
          <Header title="Process1" close={close}></Header>
          <Content>
            <Process1 setStep={setStep}></Process1>
          </Content>
        </Fragment>
      )}
      {step === 1 && (
        <Fragment>
          <Header
            title="Process2"
            back={() => setStep(0)}
            close={close}
          ></Header>
          <Content>
            <Process2 setStep={setStep}></Process2>
          </Content>
        </Fragment>
      )}
      {step === 2 && (
        <Fragment>
          <Header
            title="Process3"
            back={() => setStep(1)}
            close={close}
          ></Header>
          <Content>
            <Process3 close={close}></Process3>
          </Content>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Process;

const Wrapper = styled.div``;
const Content = styled.div`
  height: 500px;
`;
