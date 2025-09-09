import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import Notes from "@/models/noteModel";
export async function GET() {
    console.log("🔥 DB fetch triggered");
    try {
        await connect();
        const notes = await Notes.find({});
        return NextResponse.json({ notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}