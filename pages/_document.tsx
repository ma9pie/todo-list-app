import { Analytics } from "@vercel/analytics/react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 아이콘 생성 사이트 - https://favicomatic.com */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Todo List App" />
        <meta name="application-name" content="Todo List App" />
        <meta name="theme-color" content="#17171c" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-square70x70logo"
          content="/images/logos/mstile-70x70.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/images/logos/mstile-144x144.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/images/logos/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/images/logos/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/images/logos/mstile-310x310.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/logos/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/logos/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/logos/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/logos/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/logos/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/logos/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/logos/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/logos/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logos/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logos/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logos/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logos/favicon-128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logos/favicon-196x196.png"
          sizes="196x196"
        />

        {/* 기기 viewheight 할당 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
              window.addEventListener('resize', function () {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              });
            `,
          }}
        ></script>

        {/* 다크모드 시 화면 깜빡임 제거 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme");
              document.documentElement.setAttribute("data-theme", theme); 
            `,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics></Analytics>
      </body>
    </Html>
  );
}
