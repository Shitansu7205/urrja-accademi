import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import Notes from "@/models/noteModel";

export async function GET(req) {
    try {
        await connect(); // connect to MongoDB

        // Extract query params
        const { searchParams } = new URL(req.url);
        const course_id = searchParams.get("course_id");
        const sem_id = searchParams.get("sem_id");

        console.log("Query Params:", course_id, sem_id);

        if (!course_id || !sem_id) {
            return NextResponse.json(
                { error: "Both course_id and sem_id are required" },
                { status: 400 }
            );
        }

        // Convert sem_id to number if semistar is a Number type in schema
        const semNumber = Number(sem_id);

        // Fetch notes filtered by course and semester
        const notes = await Notes.find({ course_id, semistar: semNumber });
        console.log("Fetched Notes:", notes);
        return NextResponse.json({ notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}
