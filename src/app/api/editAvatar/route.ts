import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { connectMongoDb } from "@/lib/mongoDb";
import User from "@/models/user";
import fs from "fs";
import path from "path";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDb();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageBase64, fileName } = await req.json();
    if (!imageBase64 || !fileName) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const filePath = path.join(uploadsDir, fileName);
    // fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

    const imageUrl = `/uploads/${fileName}`;

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user?.email },
      { image: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
