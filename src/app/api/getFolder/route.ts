import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/mongodb";
import Folder from "@/models/folder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    await connectMongoDb();

    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email; 

    const folders = await Folder.find({ user: userEmail }).lean();
    const formattedFolders = folders.map((folder) => ({
      id: folder._id,
      title: folder.title,
      createdAt: new Date(folder.createdAt).toISOString().split('T')[0],
      flashcards: folder.flashcards,
    }))

    return NextResponse.json(formattedFolders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
