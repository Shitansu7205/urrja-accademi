import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import Notes from "@/models/noteModel";

export async function GET(req, { params }) {
    try {
        await connect();
        const { id } = await params;
        const courseId = id;

        // fetch semesters for the given course
        const semesters = await Notes.find({ course_id: courseId })
        // console.log('Semesters:', semesters)
        return NextResponse.json({ semesters })
    } catch (error) {
        console.error('Error fetching semesters:', error)
        return NextResponse.json({ error: 'Failed to fetch semesters' }, { status: 500 })
    }
}
