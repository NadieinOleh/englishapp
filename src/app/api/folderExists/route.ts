import { NextResponse, NextRequest } from "next/server";
import { connectMongoDb } from "@/lib/mongodb";
import Folder from "@/models/folder";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDb();

    const { title, user } = await req.json();

    if (!title || !user) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }


    const folder = await Folder.findOne({ title, user }).select("_id");

    return NextResponse.json({ folder: folder ? folder : null });
  } catch (error) {
    console.error("Error in /api/folderExists:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
