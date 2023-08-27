import "@/styles/app.scss";

import moment from "moment";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import { RecoilEnv, RecoilRoot } from "recoil";

import useFirebase from "@/hooks/useFirebase";
import useLogin from "@/hooks/useLogin";
import useTheme from "@/hooks/useTheme";
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

  const { data: session } = useSession<any>();
  const { setUser } = useLogin();
  const { registerUser } = useFirebase();
  const { setLight, setDark } = useTheme();
  const { initializeGA, trackPageView } = useTrackEvent();

  // Init GA4
  useEffect(() => {
    initializeGA();
  }, []);

  // 페이지 view 추적
  useEffect(() => {
    trackPageView();
  }, [router.pathname]);

  // Theme 설정
  useEffect(() => {
    const isLightMode = localStorage.getItem("theme") === "Light";
    isLightMode ? setLight() : setDark();
  }, []);

  // Login info update
  useEffect(() => {
    if (!session) return setUser(null);
    const userData = {
      email: session?.user?.email,
      image: session?.user?.image,
      name: session?.user?.name,
      expires: session.expires,
      provider: session.provider,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    setUser(userData);
    registerUser(userData);
  }, [session, setUser]);

  return (
    <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
  );
};
