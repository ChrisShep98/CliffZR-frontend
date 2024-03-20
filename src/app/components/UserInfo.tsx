"use client";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <Stack>
      <Typography>Hello {session?.user?.email}</Typography>
      <Typography>Email: HARD_CODED_EMAIL</Typography>
      <Button type="submit" onClick={() => signOut()}>
        Logout
      </Button>
    </Stack>
  );
};

export default UserInfo;
