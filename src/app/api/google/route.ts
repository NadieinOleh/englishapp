import { connectMongoDb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the incoming request body as JSON
    const { name, email, image } = await request.json();

    // Connect to MongoDB
    await connectMongoDb();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Create the new user in MongoDB
    const newUser = await User.create({
      name,
      email,
      image,  // Make sure your User schema supports the image field
    });

    // Respond with the newly created user
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Google user:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
