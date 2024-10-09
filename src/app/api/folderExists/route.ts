import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/mongodb";
import Folder from "@/models/folder";

export async function POST(req: any) {
  try {
    await connectMongoDb();

    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    console.log("Folder data received:", title);

    const folder = await Folder.findOne({ title }).select("_id");

    return NextResponse.json({ folder: folder ? folder : null });
  } catch (error) {
    console.error("Error in /api/folderExists:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
