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
    // const userCookie = req.cookies.get("user")?.value;
    // if (!userCookie) return new Response("Unauthorized", { status: 401 });

    // const user = JSON.parse(userCookie);

    // ✅ Verify payment in DB
    // let payment = await Payments.findOne({
    //     userId: user._id,
    //     noteId: id,
    //     status: "paid"
    // });
    // if (!payment) return new Response("Not purchased", { status: 403 });

    // ✅ If no expiry set, create one at payment time
    // if (!payment.expiresAt) {
    //     payment.expiresAt = new Date(Date.now() + 60 * 1000); // 1 min from first access
    //     await payment.save();
    // }

    // ✅ Check if expired
    // if (payment.expiresAt < new Date()) {
    //     return new Response("Link expired", { status: 410 }); // 410 Gone
    // }

    // ✅ Fetch note
    const note = await Notes.findById(id);
    if (!note) return new Response("Note not found", { status: 404 });

    // const expiresAt = Math.floor(payment.expiresAt.getTime() / 1000);

    const now = new Date();
    const randomSeconds = Math.floor(Math.random() * 60); // 0..59
    const expiresAt = new Date(now.getTime() + randomSeconds * 1000);

    // ✅ Generate signed URL (use stored expiry)
    const signedUrl = cloudinary.utils.private_download_url(
        note.public_id,
        "pdf",
        { resource_type: "raw", attachment: true }
    );

    return Response.json({
        signedUrl,
        expiresAt
    });
}


