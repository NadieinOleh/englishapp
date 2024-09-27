import User  from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDb();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ user: user ? user : null });
  } catch (error) {
    console.error("Error in /api/userExists:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
