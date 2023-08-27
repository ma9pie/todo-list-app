import { useEffect } from "react";

const useFixedScreen = (id: string) => {
  useEffect(() => {
    const node = document.getElementById(id);
    document.body.style.overflow = "hidden";
    return () => {
      if (node && node.childNodes.length <= 1) {
        document.body.style.overflow = "auto";
      }
    };
  }, []);
};

export default useFixedScreen;
