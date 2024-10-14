import { connectMongoDb } from "@/lib/mongodb";
import Folder from "@/models/folder";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { title, flashcards, user, description } = await req.json();
    await connectMongoDb();

    const folder = await Folder.findOne({ title, user });

    if (!folder) {
      return NextResponse.json(
        { error: "folder didn`t find" },
        { status: 400 }
      );
    }

    await Folder.updateOne(
      { title, user },
      { $set: { flashcards, description } },
    );
    console.log("folder", folder);

    return NextResponse.json({
      message: "Failed to create set",
      data: flashcards,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to create set",
      error: err,
    });
  }
}
