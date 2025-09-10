// import cloudinary from "@/lib/cloudinary";
// import Notes from "@/models/noteModel";
// import connectDB from "@/dbConfig/dbconfig";

// export async function GET(req) {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const note = await Notes.findById(id);
//     if (!note) return new Response("Note not found", { status: 404 });

//     // Expiry time (in seconds)
//     const expiresAt = Math.floor(Date.now() / 1000) + 60;
//     const expiresAtDate = new Date(expiresAt * 1000).toISOString();

//     // Generate signed URL for private PDF
//     const signedUrl = cloudinary.utils.private_download_url(
//         note.public_id,
//         "pdf", // resource format
//         {
//             expires_at: expiresAt, // 5 minutes
//             resource_type: "raw",
//             attachment: true, // force download
//         }
//     );

//     // Redirect browser to signed URL
//     // return Response.redirect(signedUrl);
//     return Response.json({
//         signedUrl, expiresAt,expiresAtDate
//     });
// }



import cloudinary from "@/lib/cloudinary";
import Notes from "@/models/noteModel";
import Payments from "@/models/paymentModel";
import connectDB from "@/dbConfig/dbconfig";

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // ✅ Get user from cookie
    const userCookie = req.cookies.get("user")?.value;
    if (!userCookie) return new Response("Unauthorized", { status: 401 });

    const user = JSON.parse(userCookie);

    // ✅ Verify payment in DB
    const payment = await Payments.findOne({
        userId: user._id,
        noteId: id,
        status: "paid"
    });
    if (!payment) return new Response("Not purchased", { status: 403 });

    // ✅ Fetch note
    const note = await Notes.findById(id);
    if (!note) return new Response("Note not found", { status: 404 });

    // ✅ Expiry time
    const expiresAt = Math.floor(Date.now() / 1000) + 300; // 5 min
    const expiresAtDate = new Date(expiresAt * 1000).toISOString();

    // ✅ Generate signed URL
    const signedUrl = cloudinary.utils.private_download_url(
        note.public_id,
        "pdf",
        { expires_at: expiresAt, resource_type: "raw", attachment: true }
    );

    return Response.json({ signedUrl, expiresAt, expiresAtDate });
}
