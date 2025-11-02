import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import Notes from "@/models/noteModel";

// POST - Create a note
export async function POST(req) {
    try {
        await connect();

        const body = await req.json();
        const { note_title, course_title, course_id, semistar, desc, img_url, file_url } = body;



        const newNote = new Notes({ note_title, course_title, course_id, semistar, desc , img_url, file_url});
        await newNote.save();

        return NextResponse.json(
            { message: "Note added successfully!", note: newNote },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET - Fetch all notes

