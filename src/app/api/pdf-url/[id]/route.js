import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const noteId = id;
        // const url = await cloudinary.api.resource(id);
        console.log("The requested id is:", noteId);

        const publicId = "urja-notes/Business_Development_Manager_ecfktz"; // for testing


        // Generate signed URL valid for 5 minutes
        const url = cloudinary.utils.private_download_url(publicId, "raw", {
            type: "authenticated",
            expires_at: Math.floor(Date.now() / 1000) + 300
        });




        return NextResponse.json({ url });
    } catch (error) {
        console.error("Error fetching PDF URL:", error);
        return NextResponse.json({ error: "Failed to fetch PDF URL" }, { status: 500 });
    }
}