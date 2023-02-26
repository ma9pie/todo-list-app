/**
 * @refference
 * https://learnersbucket.com/examples/interview/usethrottle-hook-in-react/
 */
import { useCallback, useRef } from "react";

const useThrottle = (
  callback: Function,
  wait = 300,
  option = { leading: true, trailing: true }
) => {
  const timerId: any = useRef(); // track the timer
  const lastArgs: any = useRef(); // track the args

  const throttle = useCallback(
    function (...args: any[]) {
      const { trailing, leading } = option;
      // 딜레이 호출 함수
      const waitFunc = () => {
        if (trailing && lastArgs.current) {
          callback(lastArgs.current);
          lastArgs.current = null;
          timerId.current = setTimeout(waitFunc, wait);
        } else {
          // 타이머 리셋
          timerId.current = null;
        }
      };

      // leading이 true일 경우 바로 실행
      if (!timerId.current && leading) {
        callback(args);
      }
      // arg 저장
      else {
        lastArgs.current = args;
      }

      // 딜레이 된 호출 실행
      if (!timerId.current) {
        timerId.current = setTimeout(waitFunc, wait);
      }
    },
    [callback, wait, option]
  );

  return throttle;
};
export default useThrottle;
