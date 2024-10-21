import { NextResponse, NextRequest } from "next/server";
import { connectMongoDb } from "@/lib/mongoDb";
import Folder from "@/models/folder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";



export async function GET(req: NextRequest) {
  try {
    await connectMongoDb();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session?.user?.email;

    const title = req.nextUrl.searchParams.get("title");

    const folders = await Folder.find({ user, title }).lean();

    console.log("folders:", folders);

    const flashcards = folders.map((folder) => folder.flashcards).flat(); 

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
