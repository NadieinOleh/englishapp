import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectMongoDb } from "@/lib/mongoDb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectMongoDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email })
      .select("email name image")
      .lean();
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("GET /api/me error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
