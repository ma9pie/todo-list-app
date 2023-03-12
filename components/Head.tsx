import Head from "next/head";
import React from "react";

function HeadComponent() {
  return (
    <Head>
      <title>Todo List App</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      ></meta>
    </Head>
  );
}

export default HeadComponent;
