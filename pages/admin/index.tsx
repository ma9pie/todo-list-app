import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useLogin from "@/hooks/useLogin";
import { Role } from "@/types";

const Admin = () => {
  const router = useRouter();
  const { role } = useLogin();

  const [invisible, setInvisible] = useState(true);

  useEffect(() => {
    switch (role) {
      case Role.Admin:
        setInvisible(false);
        break;
      default:
        const { hostname } = window.location;
        if (hostname !== "localhost") router.push("/");
        break;
    }
  }, [role]);

  if (invisible) return null;
  return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
