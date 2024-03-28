"use client";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Stack>
      <Typography>Hello {session?.user?.username}</Typography>
      <Typography>Email: HARD_CODED_EMAIL</Typography>
      <Button
        type="submit"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`,
          })
        }
      >
        Logout
      </Button>
    </Stack>
  );
};

export default UserInfo;
