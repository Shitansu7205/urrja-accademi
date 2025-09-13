import { NextResponse } from "next/server";
import Notes from "@/models/noteModel"; // Fix: import your DB model
import Payment from "@/models/paymentModel";
import connectDB from "@/dbConfig/dbconfig";
import Razorpay from "razorpay";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});









export async function POST(req) {
    await connectDB();

    // Await the JSON data from request
    const collectData = await req.json();

    console.log("🔥 Payment initiated for note:", collectData);

    const { noteId, name, email, phone } = collectData;


    // 1. Get note price from DB
    const note = await Notes.findById(noteId);
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });



    const options = {
        amount: note.price * 100, // in paise
        currency: "INR",
        receipt: `note_${Date.now()}`,// short and unique
        payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    // 2. Save order info + user data in DB
    await Payment.create({
        noteId,
        name,
        email,
        phone,
        orderId: order.id,
        status: "pending",
    });

    // Return order details to frontend
    return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
    });
}
