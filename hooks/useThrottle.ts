import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastValue = useRef<T>(value);
  const timeoutId = useRef<number>();

  useEffect(() => {
    if (value !== lastValue.current) {
      lastValue.current = value;
      clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(() => {
        setThrottledValue(value);
      }, delay);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
