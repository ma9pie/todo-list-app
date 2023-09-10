import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { useRecoilState, useRecoilValue } from "recoil";
import { server } from "typescript";

import { userState } from "@/recoil/atoms";
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
  View = "View",
  Login = "Login",
  Request = "Request",
  Add = "Add",
  Edit = "Edit",
  Remove = "Remove",
}

enum Category {
  Button = "Button",
  Icon = "Icon",
  Link = "Link",
  Checkbox = "Checkbox",
  Color = "Color",
  Modal = "Modal",
  SideBar = "SideBar",
  Firestore = "Firestore",
  SignIn = "SignIn",
  SignOut = "SignOut",
  List = "List",
  Task = "Task",
}

const useTrackEvent = () => {
  const router = useRouter();

  const [isInitializedGA, setIsInitializedGA] =
    useRecoilState(isInitializedGAState);
  const user = useRecoilValue(userState);
  const provider = user?.provider || "null";

  // Init GA
  const initializeGA = () => {
    const { hostname } = window.location;
    if (hostname === "localhost") return;
    const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
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

  const trackClickBtn = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Button,
      label: label,
    });
  };

  const trackClickIcon = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Icon,
      label: label,
    });
  };

  const trackClickLink = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Link,
      label: label,
    });
  };

  const trackClickCheckbox = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Checkbox,
      label: provider,
    });
  };

  const trackClickColor = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Click,
      category: Category.Color,
      label: label,
    });
  };

  const trackSignIn = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Login,
      category: Category.SignIn,
      label: label,
    });
  };

  const trackSignOut = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Login,
      category: Category.SignOut,
      label: provider,
    });
  };

  const trackRequest = (category: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Request,
      category: category,
      label: provider,
    });
  };

  const trackAddList = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Add,
      category: Category.List,
      label: provider,
    });
  };

  const trackEditList = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Edit,
      category: Category.List,
      label: provider,
    });
  };

  const trackRemoveList = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Remove,
      category: Category.List,
      label: provider,
    });
  };

  const trackAddTask = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Add,
      category: Category.Task,
      label: provider,
    });
  };

  const trackRemoveTask = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.Remove,
      category: Category.Task,
      label: provider,
    });
  };

  const trackViewModal = (label: string) => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.View,
      category: Category.Modal,
      label: label,
    });
  };

  const trackViewSideBar = () => {
    if (!isInitializedGA) return;
    ReactGA.event({
      action: Action.View,
      category: Category.SideBar,
      label: provider,
    });
  };

  return {
    initializeGA,
    trackPageView,
    trackClickBtn,
    trackClickIcon,
    trackClickLink,
    trackClickCheckbox,
    trackClickColor,
    trackSignIn,
    trackSignOut,
    trackRequest,
    trackAddList,
    trackEditList,
    trackRemoveList,
    trackAddTask,
    trackRemoveTask,
    trackViewModal,
    trackViewSideBar,
  };
};

export default useTrackEvent;
