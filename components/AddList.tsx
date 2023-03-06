import styled from "@emotion/styled";
import React, { useState } from "react";

import ColorSet from "@/components/ColorSet";
import Done from "@/components/shared/buttons/Done";
import modalUtils from "@/utils/modalUtils";

const AddList = () => {
  const [input, setInput] = useState("");
  const [colorNum, setColorNum] = useState(0);

  const onChange = (e: any) => {
    setInput(e.target.value);
  };

  const addList = () => {
    if (input === "") {
      modalUtils.openToastPopup({
        type: "warn",
        message: "Please input list name",
      });
    } else {
      modalUtils.openToastPopup({
        type: "success",
        message: "List added",
      });
      modalUtils.close("addList");
    }
  };

  return (
    <Wrapper>
      <Content>
        <Input
          type="text"
          value={input}
          placeholder="List name"
          onChange={onChange}
        ></Input>
      </Content>

      <Content>
        <ColorSet colorNum={colorNum} setColorNum={setColorNum}></ColorSet>
      </Content>

      <DoneWrapper>
        <Done onClick={addList}></Done>
      </DoneWrapper>
    </Wrapper>
  );
};

export default AddList;

const Wrapper = styled.div``;
const Content = styled.div`
  padding: 8px 0px;
  border-bottom: 1px solid var(--sectionLine);
`;
const Input = styled.input`
  font: var(--normal16);
  width: 100%;
  border: 0px;
`;

const DoneWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
`;
