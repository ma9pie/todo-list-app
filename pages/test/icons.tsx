import styled from "@emotion/styled";
import Image from "next/image";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";
import AddSvg from "@/images/add.svg";
import AddCircleSvg from "@/images/add_circle_outline.svg";
import AppleSvg from "@/images/apple.svg";
import AppsSvg from "@/images/apps.svg";
import BackSvg from "@/images/arrow_back_ios.svg";
import ForwardSvg from "@/images/arrow_forward_ios.svg";
import MoonSvg from "@/images/bedtime.svg";
import CheckSvg from "@/images/check.svg";
import CheckedSvg from "@/images/checked.svg";
import CloseSvg from "@/images/close.svg";
import CloudDoneSvg from "@/images/cloud_done.svg";
import CloudDownloadSvg from "@/images/cloud_download.svg";
import CodeSvg from "@/images/code.svg";
import PaintBoardSvg from "@/images/color_lens.svg";
import DashboardSvg from "@/images/dashboard.svg";
import DeleteSvg from "@/images/delete.svg";
import EditSvg from "@/images/edit.svg";
import EmptyListSvg from "@/images/empty_list.svg";
import EmptyPageSvg from "@/images/empty_page.svg";
import ErrorSvg from "@/images/error_outline.svg";
import HomeSvg from "@/images/home.svg";
import ListSvg from "@/images/list.svg";
import LogoSvg from "@/images/logo.svg";
import EmailSvg from "@/images/mail_outline.svg";
import MenuSvg from "@/images/menu.svg";
import MoreVertSvg from "@/images/more_vert.svg";
import PushPinSvg from "@/images/push_pin.svg";
import SettingSvg from "@/images/settings.svg";
import ShareSvg from "@/images/share.svg";
import GithubSvg from "@/images/social/github.svg";
import GoogleSvg from "@/images/social/google.svg";
import SubjectSvg from "@/images/subject.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import UncheckedSvg from "@/images/unchecked.svg";
import UserSvg from "@/images/user.svg";
import WarningSvg from "@/images/warning_amber.svg";
import SunSvg from "@/images/wb_sunny.svg";

function Components() {
  return (
    <Wrapper>
      <LogoSvg width={200} height={200}></LogoSvg>
      <LogoSvg width={32} height={32}></LogoSvg>

      <Grid>
        <AddSvg></AddSvg>
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
        <PaintBoardSvg></PaintBoardSvg>
        <DashboardSvg></DashboardSvg>
        <DeleteSvg></DeleteSvg>
        <EditSvg></EditSvg>
        <ErrorSvg></ErrorSvg>
        <GithubSvg></GithubSvg>
        <HomeSvg></HomeSvg>
        <ListSvg></ListSvg>
        <EmailSvg></EmailSvg>
        <MenuSvg></MenuSvg>
        <MoreVertSvg></MoreVertSvg>
        <PushPinSvg></PushPinSvg>
        <SettingSvg></SettingSvg>
        <SubjectSvg></SubjectSvg>
        <WarningSvg></WarningSvg>
        <TrashCanSvg></TrashCanSvg>
        <CheckedSvg></CheckedSvg>
        <UncheckedSvg></UncheckedSvg>
        <SunSvg></SunSvg>
        <UserSvg></UserSvg>
        <ShareSvg></ShareSvg>
      </Grid>

      <Grid>
        <GoogleSvg></GoogleSvg>
        <AppleSvg></AppleSvg>
      </Grid>

      <Grid>
        <MoonSvg className="fill-sub"></MoonSvg>
        <SunSvg className="fill-sub"></SunSvg>
      </Grid>

      <div>
        <Image
          src="/images/empty_list.svg"
          width={120}
          height={120}
          alt="empty_list"
        ></Image>
        <Image
          src="/images/empty_page.svg"
          width={120}
          height={120}
          alt="empty_page"
        ></Image>
        <EmptyListSvg width={80} height={80}></EmptyListSvg>
        <EmptyPageSvg width={80} height={80}></EmptyPageSvg>
      </div>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div`
  display: grid;
  gap: 32px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  gap: 16px;
`;
