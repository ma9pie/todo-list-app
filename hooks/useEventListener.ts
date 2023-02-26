import { useEffect, useRef } from "react";

/**
 * 이벤트 리스너 hooks
 * @param {String} eventName : 이벤트 이름
 * @param {Function} handler : 이벤트 발생 시 실행할 함수
 * @param {Object} element : 이벤트를 등록할 요소
 * @refference
 * https://usehooks.com/useEventListener
 */

function useEventListener(
  eventName: string,
  handler: Function,
  element = window
) {
  const savedHandler: any = useRef();

  // handler 변경 시 ref.current 업데이트
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // 해당 요소가 addEventListener를 지원하는지 확인
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // ref내에 저장된 handler함수를 호출하는 이벤트 리스너 생성
      const eventListener = (e: any) => savedHandler.current(e);

      // 이벤트 등록
      element.addEventListener(eventName, eventListener);
      return () => {
        // 이벤트 해제
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // eventName 또는 element 변경 시
  );
}

export default useEventListener;
