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

export const getCurrentTime = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};
