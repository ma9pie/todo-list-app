import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";

import { firestore } from "@/firebase/firestore";
import { userState } from "@/recoil/atoms";
import { LoginType, User } from "@/types";
import { createUid, getCurrentTime } from "@/utils";

const useLogin = () => {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);
  const userKey = user?.userKey;
  const email = user?.email;
  const name = user?.name;
  const image = user?.image;
  const expires = user?.expires;
  const provider = user?.provider;
  const createdAt = user?.createdAt;

  const googleLogin = () => {
    signIn(LoginType.Google);
  };

  const githubLogin = () => {
    signIn(LoginType.Github);
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  // User 등록
  const registerUser = async (session: Session) => {
    try {
      const userData: User = {
        email: session?.user?.email,
        image: session?.user?.image,
        name: session?.user?.name,
        expires: session.expires,
        provider: session.provider,
        createdAt: getCurrentTime(),
      };
      const _users = await firestore
        .collection("users")
        .where("email", "==", userData.email)
        .where("provider", "==", userData.provider)
        .get();
      const _user = _users.docs[0]?.data();
      if (_user) {
        setUser(_user);
      } else {
        const userKey = createUid();
        userData.userKey = userKey;
        await firestore.collection("users").doc(userKey).set(userData);
        setUser(userData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    userKey,
    email,
    name,
    image,
    expires,
    provider,
    createdAt,
    setUser,
    googleLogin,
    githubLogin,
    logout,
    registerUser,
  };
};

export default useLogin;
