import "@/styles/app.scss";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { RecoilEnv, RecoilRoot } from "recoil";

import PageLoading from "@/components/shared/PageLoading";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useTheme from "@/hooks/useTheme";
import useTodo from "@/hooks/useTodo";
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
  const { user, setUser, autoLogin } = useLogin();
  const { updatedAt, setTodoList, setIsLoadingTodoList, getClusters } =
    useTodo();
  const local = useLocalStorage();
  const { setLight, setDark } = useTheme();
  const { initializeGA, trackPageView } = useTrackEvent();

  const [isLoading, setIsLoading] = useState(false);

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
    (async () => {
      if (!session) return setUser(null);
      setIsLoading(true);
      await autoLogin(session);
      setIsLoading(false);
    })();
  }, [session]);

  // TodoList 업데이트
  useEffect(() => {
    (async () => {
      setIsLoadingTodoList(true);
      setTodoList(await getClusters());
      setIsLoadingTodoList(false);
    })();
  }, [user, updatedAt, local.clusters]);

  return (
    <ModalProvider>
      {isLoading && <PageLoading></PageLoading>}
      {getLayout(<Component {...pageProps} />)}
    </ModalProvider>
  );
};
