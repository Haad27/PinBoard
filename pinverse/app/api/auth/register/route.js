import cloudinary from "@/libs/cloudinary";
import connectToDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectToDB();

  const formData = await request.formData();

  const image = formData.get("image");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!image || !username || !email || !password) {
    return NextResponse.json(
      { error: "All fields including image are required" },
      { status: 400 }
    );
  }

  try {
    // Convert image to buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Cloudinary
    const uploadedResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      image: uploadedResponse.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration failed", error);

    return NextResponse.json(
      { error: "User registration failed" },
      { status: 500 }
    );
  }
}