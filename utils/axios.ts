import axios from "axios";

import { modalUtils } from "@/hooks/useModal";

let isServerError = false;

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: headers,
});

instance.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    console.log("request error");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("\n========== axios response ==========");
    console.log(res.request.responseURL);
    console.log(res.data);
    return Promise.resolve(res);
  },
  (error) => {
    console.log("########## axios error ##########");
    console.log(error);

    if (!isServerError) {
      isServerError = true;
      modalUtils.openAlert({
        message: `서버 오류가\n 발생하였습니다.`,
        onAfterClose: () => {
          isServerError = false;
        },
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
