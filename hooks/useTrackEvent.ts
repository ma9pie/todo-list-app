import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { useRecoilState } from "recoil";

import { isInitializedGAState } from "@/recoil/atoms";

/**
 * [ReactGA.event params]
 * @param action: string
 * @param category: string
 * @param label?: string
 * @param value?: number
 * @param nonInteraction?: boolean
 * @param transport?: 'beacon' | 'xhr' | 'image'
 */

enum Action {
  Click = "Click",
}

enum Category {
  Button = "Button",
}

const useTrackEvent = () => {
  const router = useRouter();

  const [isInitializedGA, setIsInitializedGA] =
    useRecoilState(isInitializedGAState);

  // Init GA
  const initializeGA = () => {
    const { hostname } = window.location;
    if (hostname === "localhost") return;
    const trackingId = process.env.GA_TRACKING_ID;
    if (!trackingId) return;
    ReactGA.initialize(trackingId);
    setIsInitializedGA(true);
  };

  // 페이지 view 추적
  const trackPageView = () => {
    if (!isInitializedGA) return;
    ReactGA.set({ page: router.pathname });
    ReactGA.send("pageview");
  };

  // Click Button
  const trackClickBtn = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Button,
      label: label,
    });
  };

  return {
    initializeGA,
    trackPageView,
    trackClickBtn,
  };
};

export default useTrackEvent;
