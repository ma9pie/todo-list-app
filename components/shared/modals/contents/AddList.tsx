import styled from "@emotion/styled";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Done from "@/components/shared/buttons/Done";
import ColorSet from "@/components/shared/ColorSet";
import { clusterState, taskState } from "@/recoil/atom";
import commonUtils from "@/utils/commonUtils";
import localUtils from "@/utils/localUtils";
import modalUtils from "@/utils/modalUtils";

const colorList = [
  "#64a8ff",
  "#fb8890",
  "#ffbd51",
  "#ffdd78",
  "#c770e4",
  "#58c7c7",
  "#3fd599",
  "#d1d6db",
  "#4d4d59",
];

const AddList = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState(colorList[0]);
  const [clusters, setClusters] = useRecoilState(clusterState);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };

  const addList = () => {
    if (title === "") {
      modalUtils.openToastPopup({
        type: "warn",
        message: "Please input list name",
      });
    } else {
      addCluster();
      modalUtils.openToastPopup({
        type: "success",
        message: "List added",
      });
      modalUtils.close("addList");
    }
  };

  const addCluster = () => {
    const result = clusters.concat({
      clusterId: commonUtils.uid(),
      title: title,
      color: color,
      pinned: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    setClusters(result);
  };

  return (
    <Wrapper>
      <Content>
        <Input
          ref={ref}
          type="text"
          value={title}
          placeholder="List name"
          onChange={onChange}
        ></Input>
      </Content>

      <Content>
        <ColorSet
          color={color}
          colorList={colorList}
          setColor={setColor}
        ></ColorSet>
      </Content>

      <DoneWrapper>
        <Done onClick={addList}></Done>
      </DoneWrapper>
    </Wrapper>
  );
};

export default AddList;

const Wrapper = styled.div`
  position: relative;
  height: 300px;
`;
const Content = styled.div`
  padding: 8px 0px;
  border-bottom: 1px solid var(--sectionLine);
`;
const Input = styled.input`
  font: var(--normal16);
  width: 100%;
  height: 30px;
  border: 0px;
`;
const DoneWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
`;
