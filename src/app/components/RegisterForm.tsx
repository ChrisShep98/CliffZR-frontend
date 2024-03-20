"use client";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill out all fields");
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = event.target;
        form.reset();
        router.push("/dashboard");
      } else if (res.status === 400) {
        setError("User with that email already exists");
        console.log("User with that email already exists");
      }
    } catch (error) {
      setError("Error during registration");
      console.log("Error during registration", error);
    }
  };

  return (
    <Stack height={"100vh"} justifyContent={"center"}>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography>Register an account here!</Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="User Name"></input>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
          <button typeof="submit">Login</button>
        </form>
        {error && <Typography color={"red"}>{error}</Typography>}
        <Link href={"/"}>Already have an account? Login here</Link>
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
