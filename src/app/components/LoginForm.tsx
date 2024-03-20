"use client";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack height={"100vh"} justifyContent={"center"}>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography>Enter your login details</Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"></input>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
          <button type="submit">Login</button>
        </form>
        {error && <Typography color={"red"}>{error}</Typography>}
        <Link href={"/register"}>Don't have an account? Register here</Link>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
