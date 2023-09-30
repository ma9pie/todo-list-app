import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";

import { firestore } from "@/firebase/firestore";
import useTrackEvent from "@/hooks/useTrackEvent";
import { userState } from "@/recoil/atoms";
import { LoginType, Role, User } from "@/types";
import { createUid, getCurrentTime } from "@/utils";

const useLogin = () => {
  const router = useRouter();

  const { trackSignIn, trackSignOut, trackRequest } = useTrackEvent();

  const [user, setUser] = useRecoilState(userState);
  const userKey = user?.userKey;
  const email = user?.email;
  const name = user?.name;
  const image = user?.image;
  const expires = user?.expires;
  const provider = user?.provider;
  const createdAt = user?.createdAt;
  const role = user?.role;

  const login = (type: LoginType) => {
    trackSignIn(type);
    router.push("/");
    setTimeout(
      () =>
        signIn(type, undefined, {
          prompt: "select_account",
        }),
      100
    );
  };

  const logout = async () => {
    trackSignOut();
    router.push("/");
    setTimeout(() => signOut(), 100);
  };

  const getUsers = async (email: string, provider: string) => {
    trackRequest("getUsers");
    return firestore
      .collection("users")
      .where("email", "==", email)
      .where("provider", "==", provider)
      .get();
  };

  const getAllUsers = async () => {
    trackRequest("getAllUsers");
    const users = await firestore.collection("users").get();
    return users.docs.map((item) => item.data());
  };

  const createUser = (userData: User) => {
    trackRequest("createUser");
    const userKey = createUid();
    return firestore
      .collection("users")
      .doc(userKey)
      .set({
        userKey,
        ...userData,
      });
  };

  const autoLogin = async (session: Session) => {
    try {
      const _email = session?.user?.email;
      const _image = session?.user?.image;
      const _name = session?.user?.name;
      const _expires = session.expires;
      const _provider = session.provider;

      if (!_email || !_provider) return;

      const users = await getUsers(_email, _provider);
      const _user = users.docs[0]?.data();
      if (_user) {
        if (!_user.role) _user.role = Role.User;
        setUser(_user);
      } else {
        const userData: User = {
          email: _email,
          image: _image,
          name: _name,
          expires: _expires,
          provider: _provider,
          createdAt: getCurrentTime(),
          role: Role.User,
        };
        await createUser(userData);
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
    role,
    setUser,
    login,
    logout,
    autoLogin,
    getAllUsers,
  };
};

export default useLogin;
