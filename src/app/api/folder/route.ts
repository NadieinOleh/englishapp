import { connectMongoDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Folder from "./../../../models/folder";
export async function POST(req: any) {
  try {
    const { title, user } = await req.json();
    console.log("Folder data received:", title, user);

    await connectMongoDb();

    const newFolder = await Folder.create({ title, user, flashcards: [] });

    return NextResponse.json({
      message: "Created folder successfully",
      data: newFolder,
    });
  } catch (error) {
    console.error("Error during folder creation:", error);
    return NextResponse.json({
      message: "Failed to create folder",
      error: error,
    });
  }
}