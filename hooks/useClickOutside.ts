import { useEffect } from "react";

/**
 * 바깥영역 클릭 감지 hooks
 * @param {any} ref : 요소
 * @param {Function} callback : 콜백함수
 */

const useClickOutside = (ref: any, callback: Function) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useClickOutside;
