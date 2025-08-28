// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await connect();

        const { name, email, password, number } = await req.json();

        if (!name || !email || !password || !number) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            number,
        });

        return NextResponse.json({ message: "User registered successfully", user: { id: user._id, name, email, number } });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
