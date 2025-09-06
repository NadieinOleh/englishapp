import { NextResponse, NextRequest } from "next/server";
import { connectMongoDb } from "@/lib/mongoDb";
import Folder from "@/models/folder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDb();

    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session?.user?.email;

    const { flashcards, newDesc } = await req.json();


    
    const title = req.nextUrl.searchParams.get("title"); 



    if (!flashcards || !title) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const folder = await Folder.findOne({ user, title });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    folder.flashcards = flashcards; 
    folder.description = newDesc;

    await folder.save();

    return NextResponse.json({ success: true, flashcards: folder.flashcards });
  } catch (error) {
    console.error("Error updating flashcards:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
