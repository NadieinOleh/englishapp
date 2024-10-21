import { connectMongoDb } from "@/lib/mongoDb";
import Folder from "@/models/folder";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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
