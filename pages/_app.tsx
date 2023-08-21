import "@/styles/app.scss";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import { RecoilEnv, RecoilRoot } from "recoil";

import useTrackEvent from "@/hooks/useTrackEvent";
import ModalProvider from "@/modals/ModalProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App(props: AppPropsWithLayout) {
  return (
    <SessionProvider session={props.session}>
      <RecoilRoot>
        <AppInner {...props}></AppInner>
      </RecoilRoot>
    </SessionProvider>
  );
}

const AppInner = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  const { initializeGA, trackPageView } = useTrackEvent();

  // Init GA4
  useEffect(() => {
    initializeGA();
    console.log(process.env.NEXT_PUBLIC_GOOGLE_ID![0]);
    console.log(process.env.NEXT_PUBLIC_GOOGLE_SECRET![0]);
  }, []);

  // 페이지 view 추적
  useEffect(() => {
    trackPageView();
  }, [router.pathname]);

  return (
    <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
  );
};
