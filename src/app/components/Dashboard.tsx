"use client";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getUserBoulderingGrades } from "../services/ClimbingService";
import { ClimbingGrades } from "../types/climbing";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const [boulderingGrades, setBoulderingGrades] = useState<ClimbingGrades[]>([]);
  const { data: session } = useSession();
  const username = session?.user.username;
  const router = useRouter();

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        if (username == undefined) {
          return null;
        }
        const response = await getUserBoulderingGrades(username);
        setBoulderingGrades(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllContacts();
  }, [username]);

  console.log(boulderingGrades);

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
      <Stack
        gap={4}
        direction={"row"}
        flexWrap={"wrap"}
        m={"auto"}
        width={"500px"}
        justifyContent={"center"}
      >
        {boulderingGrades.map(({ title, id, status, image }) => {
          return (
            <Stack
              key={id}
              onClick={() => router.push(`/${title}`)}
              textAlign={"center"}
              justifyContent={"center"}
              width={"200px"}
              height={"185px"}
              border={"2px solid black"}
              borderRadius={"50%"}
              sx={{
                "&:hover": {
                  backgroundColor: "#d3d3d3",
                  cursor: "pointer",
                },
              }}
            >
              <Typography fontWeight={"600"} fontSize={"32px"}>
                {title}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default UserInfo;
