import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/dbConfig/dbconfig";
import Payment from "@/models/paymentModel";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, noteId } = body;

  try {
    // 1. Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // 2. Update payment status in DB
    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
      { new: true }
    );

    if (!payment) {
      return NextResponse.json({ success: false, message: "Payment record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("❌ Payment verify error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
