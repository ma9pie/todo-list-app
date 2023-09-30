import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useLogin from "@/hooks/useLogin";
import { Role, User } from "@/types";
import { formatDate } from "@/utils";

const Admin = () => {
  const router = useRouter();
  const { role, getAllUsers } = useLogin();

  const [invisible, setInvisible] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Admin 계정만 접근
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

  useEffect(() => {
    (async () => {
      setAllUsers(await getAllUsers());
    })();
  }, []);

  const roleColor = useCallback((role?: Role) => {
    switch (role) {
      case Role.Admin:
        return "var(--brandColor)";
      default:
        return "var(--main)";
    }
  }, []);

  if (invisible) return null;
  return (
    <Wrapper>
      <Container>
        <Field>
          <Row>
            <Column>UserKey</Column>
            <Column>Image</Column>
            <Column>Name</Column>
            <Column>Email</Column>
            <Column>Provider</Column>
            <Column>Role</Column>
            <Column>Expires</Column>
            <Column>CreatedAt</Column>
          </Row>
        </Field>

        <Table>
          {allUsers.map((user) => (
            <Row key={user.userKey}>
              <Column>{user.userKey}</Column>
              <Column>
                {user.image && (
                  <Image
                    src={user.image}
                    width={24}
                    height={24}
                    alt="user-image"
                  ></Image>
                )}
              </Column>
              <Column>{user.name}</Column>
              <Column>{user.email}</Column>
              <Column>{user.provider}</Column>
              <Column color={roleColor(user.role)}>{user.role}</Column>
              <Column>{formatDate(user.expires)}</Column>
              <Column>{formatDate(user.createdAt)}</Column>
            </Row>
          ))}
        </Table>
      </Container>
    </Wrapper>
  );
};

export default Admin;

Admin.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const Wrapper = styled.div``;
const Container = styled.div`
  min-width: 1280px;
  padding: 16px;
`;
const Field = styled.div`
  & * {
    color: var(--sub);
  }
`;
const Table = styled.div``;
const Row = styled.div`
  display: flex;
  align-items: center;
  height: 32px;

  // UserKey
  & > div:nth-of-type(1) {
    width: 80px;
  }
  // Image
  & > div:nth-of-type(2) {
    width: 80px;
  }
  // Name
  & > div:nth-of-type(3) {
    flex: 1;
    text-align: left;
  }
  // Email
  & > div:nth-of-type(4) {
    flex: 1;
    text-align: left;
  }
  // Provider
  & > div:nth-of-type(5) {
    width: 80px;
  }
  // Role
  & > div:nth-of-type(6) {
    width: 60px;
  }
  // Expires
  & > div:nth-of-type(7) {
    width: 180px;
  }
  // CreatedAt
  & > div:nth-of-type(8) {
    width: 180px;
  }
`;
const Column = styled.div<{ color?: string }>`
  height: 24px;
  text-align: center;
  color: ${(props) => props.color};
`;
