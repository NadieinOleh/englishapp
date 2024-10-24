import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import Folder from "@/models/folder";

export async function PATCH(req: NextRequest) {
  try {
    await connectMongoDb();
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email;

    const { title } = await req.json();

    const folders = await Folder.find({ user: userEmail, title }).lean();

    if (!folders) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    await Folder.updateOne(
      { user: userEmail, title },
      { $set: { flashcards: [] } }
    );

    return NextResponse.json({ message: "Flashcards removed successfully" });
  } catch (error) {
    console.error(error, "removeFlashcards");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
