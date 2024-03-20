import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any) {
  try {
    const { username, email, password } = await req.json();
    // try out below code when getting req param to NextApiRequest type
    // const { userName, email, password } = await req.body.json()

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering" }, { status: 500 });
  }
}
