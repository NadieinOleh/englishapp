import { connectMongoDb } from "@/lib/mongoDb";
import Folder from "@/models/folder";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDb();

    const { id } = await req.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid folder ID" }, { status: 400 });
    }

    const result = await Folder.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error in /api/removeFolder:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
