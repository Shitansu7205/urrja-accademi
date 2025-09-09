import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbconfig";
import Note from "@/models/noteModel";

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = await params;
    // const noteId = params.id;   // ✅ get id directly
    console.log("Deleting note with ID:", id);

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
