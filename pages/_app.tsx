import "@/styles/app.scss";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { Fragment, useEffect } from "react";
import { RecoilEnv, RecoilRoot } from "recoil";

import useTrackEvent from "@/hooks/useTrackEvent";
import ModalProvider from "@/modals/ModalProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  const { initializeGA, trackPageView } = useTrackEvent();

  // Init GA4
  useEffect(() => {
    initializeGA();
  }, []);

  // 페이지 view 추적
  useEffect(() => {
    trackPageView();
  }, [router.pathname]);

  return (
    <Fragment>
      <RecoilRoot>
        <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
      </RecoilRoot>
    </Fragment>
  );
}
