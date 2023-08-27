import { signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";

import { userState } from "@/recoil/atoms";
import { LoginType } from "@/types";

const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);

  const googleLogin = () => {
    signIn(LoginType.Google);
  };

  const githubLogin = () => {
    signIn(LoginType.Github);
  };

  const logout = () => {
    signOut();
  };

  return { user, setUser, googleLogin, githubLogin, logout };
};

export default useLogin;
