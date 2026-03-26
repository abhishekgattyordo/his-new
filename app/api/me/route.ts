import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    // 2. Verify and decode the token
    const secret = process.env.JWT_SECRET; // make sure this is set in .env.local
    if (!secret) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    // 3. Use the email from the token to fetch the user from the database
    const email = decoded.email; // or decoded.sub, depending on how you structured the token
    if (!email) {
      return NextResponse.json({ success: false, message: "Token missing email" }, { status: 401 });
    }

    const result = await query(
      `SELECT id, email, role, doctor_id FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    // 4. Return the user data (including doctor_id)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,               // primary key of users table
        email: user.email,
        role: user.role,
        doctor_id: user.doctor_id, // this is what we need for the schedule page
      },
    });
  } catch (error) {
    console.error("Error in /api/me:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}