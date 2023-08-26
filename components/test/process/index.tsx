import styled from "@emotion/styled";
import React, { Fragment, useEffect, useState } from "react";

import ModalHeader from "@/components/modals/ModalHeader";
import Process1 from "@/components/test/process/Process1";
import Process2 from "@/components/test/process/Process2";
import Process3 from "@/components/test/process/Process3";

const Process = () => {
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

  return (
    <Wrapper>
      {step === 0 && (
        <Fragment>
          <ModalHeader title="Process1"></ModalHeader>
          <Content>
            <Process1 setStep={setStep}></Process1>
          </Content>
        </Fragment>
      )}
      {step === 1 && (
        <Fragment>
          <ModalHeader title="Process2" back={() => setStep(0)}></ModalHeader>
          <Content>
            <Process2 setStep={setStep}></Process2>
          </Content>
        </Fragment>
      )}
      {step === 2 && (
        <Fragment>
          <ModalHeader title="Process3" back={() => setStep(1)}></ModalHeader>
          <Content>
            <Process3></Process3>
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
