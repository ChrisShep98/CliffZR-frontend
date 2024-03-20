import React from "react";
import UserInfo from "../components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <UserInfo />
    </>
  );
};

export default Dashboard;
