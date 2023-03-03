import "@/styles/app.scss";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { Fragment, useEffect } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  // 구글 애널리틱스
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // @ts-ignore
      window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>;
}
