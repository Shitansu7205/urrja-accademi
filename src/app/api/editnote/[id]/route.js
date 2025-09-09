import connectDB from "@/dbConfig/dbconfig";
import Notes from "@/models/noteModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const body = await req.json();
        const { note_title, desc, price } = body;

        console.log("Updating note with ID:", id);
        console.log("Updated data:", note_title, desc, price);

        // Update the note in MongoDB
        const updatedNote = await Notes.findByIdAndUpdate(
            id,
            { note_title, desc, price },
            { new: true } // return the updated document
        );

        if (!updatedNote) {
            return NextResponse.json(
                { success: false, message: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedNote, { status: 200 });
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update note" },
            { status: 500 }
        );
    }
}
