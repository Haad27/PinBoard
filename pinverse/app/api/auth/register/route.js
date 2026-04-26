import connectToDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();

  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed", error);

    return NextResponse.json(
      { error: "User registration failed" },
      { status: 500 }
    );
  }
}