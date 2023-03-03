import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="사용자가 할 일을 리스트에 추가하고, 체크박스로 완료 여부를 표시할 수 있도록 해주는 Todo List App입니다. 사용자들은 할 일을 보다 체계적으로 관리할 수 있으며, 직관적이고 간단한 디자인으로 제작되어, 간편하게 사용할 수 있습니다."
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="ma9pie" />
        <meta name="image" content="/images/logo.svg" />
        <meta name="robots" content="index, follow" />

        <meta name="keywords" content="todo, todo list, todo list app" />
        <meta property="og:url" content="https://todo-list-ma9pie.vercel.app" />
        <meta property="og:site_name" content="Todo List App" />
        <meta property="og:title" content="Todo List App" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta
          property="og:description"
          content="사용자가 할 일을 리스트에 추가하고, 체크박스로 완료 여부를 표시할 수 있도록 해주는 Todo List App입니다. 사용자들은 할 일을 보다 체계적으로 관리할 수 있으며, 직관적이고 간단한 디자인으로 제작되어, 간편하게 사용할 수 있습니다."
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="Todo List App" />
        <meta
          name="twitter:url"
          content="https://todo-list-ma9pie.vercel.app"
        />
        <meta name="twitter:site_name" content="Todo List App" />
        <meta name="twitter:title" content="Todo List App" />
        <meta name="twitter:image" content="/images/logo.svg" />
        <meta
          name="twitter:description"
          content="사용자가 할 일을 리스트에 추가하고, 체크박스로 완료 여부를 표시할 수 있도록 해주는 Todo List App입니다. 사용자들은 할 일을 보다 체계적으로 관리할 수 있으며, 직관적이고 간단한 디자인으로 제작되어, 간편하게 사용할 수 있습니다."
        />
        <meta name="twitter:type" content="website" />

        {/* 아이콘 생성 사이트 - https://favicomatic.com */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Todo List App" />
        <meta name="application-name" content="Todo List App" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-square70x70logo"
          content="icons/mstile-70x70.png"
        />
        <meta
          name="msapplication-TileImage"
          content="icons/mstile-144x144.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="icons/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="icons/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="icons/mstile-310x310.png"
        />
        <link rel="manifest" href="manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="icons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="icons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="icons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-196x196.png"
          sizes="196x196"
        />

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
        <div id="modal"></div>
        <div id="bottom-sheet"></div>
        <div id="toast-popup"></div>
        <div id="confirm-modal"></div>
        <div id="alert-modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
