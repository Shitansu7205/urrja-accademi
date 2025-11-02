import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/dbConfig/dbconfig"; // your MongoDB connection
import Notes from "@/models/noteModel";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const note_title = formData.get("note_title");
    const course_title = formData.get("course_title");
    const course_id = formData.get("course_id");
    const semistar = Number(formData.get("semistar"));
    const desc = formData.get("desc");
    const price = Number(formData.get("price"));
    const file = formData.get("file"); // PDF
    const img = formData.get("img");   // image thumbnail

    if (!file || !img) {
      return NextResponse.json({ success: false, message: "File or image missing" }, { status: 400 });
    }

    // Upload PDF (private)
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const pdfBase64 = `data:application/pdf;base64,${pdfBuffer.toString("base64")}`;
    const pdfResult = await cloudinary.uploader.upload(pdfBase64, {
      folder: "notes",
      resource_type: "raw",
      type: "private", // private file
    });

    // Upload Image (public)
    const imgBuffer = Buffer.from(await img.arrayBuffer());
    const imgBase64 = `data:${img.type};base64,${imgBuffer.toString("base64")}`;
    const imgResult = await cloudinary.uploader.upload(imgBase64, {
      folder: "notes/previewimages",
      resource_type: "image",
      type: "upload", // public
    });

    // Save to MongoDB
    const newNote = await Notes.create({
      note_title,
      course_title,
      course_id,
      semistar,
      desc,
      price,
      img_url: imgResult.secure_url,
      file_url: "", // download link only for paid users
      public_id: pdfResult.public_id,
    });

    return NextResponse.json({ success: true, note: newNote });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
