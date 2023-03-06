import styled from "@emotion/styled";
import React from "react";

import AddSvg from "@/images/add.svg";

const AddTodoBtn = () => {
  return (
    <Wrapper>
      <AddSvg></AddSvg>
    </Wrapper>
  );
};

export default AddTodoBtn;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  path {
    fill: white;
  }
`;
