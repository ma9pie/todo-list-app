import styled from "@emotion/styled";
import moment from "moment";
import React, { useState } from "react";

import useModal from "@/hooks/useModal";
import { ToastStatus } from "@/recoil/states/modal";
import Done from "@/shared/buttons/Done";
import ColorSet from "@/shared/ColorSet";
import { Cluster } from "@/types";
import commonUtils from "@/utils/commonUtils";

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

type Props = {
  clusters: Array<Cluster>;
  setClusters: Function;
};

const AddList = (props: Props) => {
  const modal = useModal();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState(colorList[0]);

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };

  const addList = () => {
    if (title === "") {
      modal.openToast({
        status: ToastStatus.Warn,
        message: "Please input list name",
      });
    } else {
      addCluster();
      modal.openToast({
        status: ToastStatus.Success,
        message: "List added",
      });
      modal.closeModal("addList");
    }
  };

  const addCluster = () => {
    const result = props.clusters.concat({
      clusterId: commonUtils.uid(),
      title: title,
      color: color,
      pinned: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    props.setClusters(result);
  };

  return (
    <Wrapper>
      <Content>
        <Input
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
