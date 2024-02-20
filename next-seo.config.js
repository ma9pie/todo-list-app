import { DESCRIPTION, OG_IMAGE, TITLE, URL } from "@/constants";

const seoConfig = {
  canonical: URL,
  openGraph: {
    type: "website",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: OG_IMAGE,
        alt: "og image",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default seoConfig;
