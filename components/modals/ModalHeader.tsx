import styled from "@emotion/styled";
import React from "react";

import Text from "@/components/common/Text";
import useModal from "@/hooks/useModal";
import BackSvg from "@/images/arrow_back_ios.svg";
import CloseSvg from "@/images/close.svg";

type Props = {
  title?: string;
  back?: () => void;
};

const ModalHeader = ({ title, back }: Props) => {
  const { closeModal } = useModal();

  return (
    <Wrapper>
      <IconWrapper>{back && <BackSvg onClick={back}></BackSvg>}</IconWrapper>
      <Text s18 bold>
        {title}
      </Text>
      <IconWrapper>
        <CloseSvg onClick={() => closeModal()}></CloseSvg>
      </IconWrapper>
    </Wrapper>
  );
};

export default ModalHeader;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;
