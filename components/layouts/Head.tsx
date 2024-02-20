import { NextSeo } from "next-seo";
import React from "react";

import { DESCRIPTION, TITLE } from "@/constants";

interface Props {
  title?: string;
  description?: string;
}

const Component = ({ title = TITLE, description = DESCRIPTION }: Props) => {
  return <NextSeo title={title} description={description}></NextSeo>;
};

export default Component;
