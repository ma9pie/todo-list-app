import moment from "moment";

// uid 생성기
export const createUid = () => {
  if (typeof window !== undefined && window.crypto) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(36);
  } else {
    return Math.random().toString(36).substring(2, 9);
  }
};

// 현재 시간 조회
export const getCurrentTime = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

// Delay
export const delay = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};
