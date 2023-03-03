import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import AddCircleSvg from "@/images/add_circle_outline.svg";
import AppsSvg from "@/images/apps.svg";
import BackSvg from "@/images/arrow_back_ios.svg";
import ForwardSvg from "@/images/arrow_forward_ios.svg";
import MoonSvg from "@/images/bedtime.svg";
import CheckSvg from "@/images/check.svg";
import CloseSvg from "@/images/close.svg";
import CloudDoneSvg from "@/images/cloud_done.svg";
import CloudDownloadSvg from "@/images/cloud_download.svg";
import CodeSvg from "@/images/code.svg";
import PaintSvg from "@/images/color_lens.svg";
import DashboardSvg from "@/images/dashboard.svg";
import DeleteSvg from "@/images/delete.svg";
import EditSvg from "@/images/edit.svg";
import ErrorSvg from "@/images/error_outline.svg";
import ListSvg from "@/images/list.svg";
import LogoSvg from "@/images/logo.svg";
import EmailSvg from "@/images/mail_outline.svg";
import MenuSvg from "@/images/menu.svg";
import SettingSvg from "@/images/settings.svg";
import SubjectSvg from "@/images/subject.svg";
import WarningSvg from "@/images/warning_amber.svg";
import SunSvg from "@/images/wb_sunny.svg";
import TestLayout from "@/layouts/TestLayout";

function Components() {
  return (
    <Wrapper>
      <LogoSvg width={200} height={200}></LogoSvg>

      <Grid>
        <AddCircleSvg></AddCircleSvg>
        <AppsSvg></AppsSvg>
        <BackSvg></BackSvg>
        <ForwardSvg></ForwardSvg>
        <MoonSvg></MoonSvg>
        <CheckSvg></CheckSvg>
        <CloseSvg></CloseSvg>
        <CloudDoneSvg></CloudDoneSvg>
        <CloudDownloadSvg></CloudDownloadSvg>
        <CodeSvg></CodeSvg>
        <PaintSvg></PaintSvg>
        <DashboardSvg></DashboardSvg>
        <DeleteSvg></DeleteSvg>
        <EditSvg></EditSvg>
        <ErrorSvg></ErrorSvg>
        <ListSvg></ListSvg>
        <EmailSvg></EmailSvg>
        <MenuSvg></MenuSvg>
        <SettingSvg></SettingSvg>
        <SubjectSvg></SubjectSvg>
        <WarningSvg></WarningSvg>
        <SunSvg></SunSvg>
      </Grid>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  gap: 16px;
`;
