import { NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbconfig";
import Payment from "@/models/paymentModel";

export async function GET() {
  try {
    await connectDB();

    // Get all payments
    const payments = await Payment.find({});

    if (!payments || payments.length === 0) {
      return NextResponse.json(
        { success: false, message: "No payments found" },
        { status: 404 }
      );
    }

    // Calculate total amount
    const totalAmount = payments.reduce(
      (acc, p) => acc + (p.amount || 0),
      0
    );

    return NextResponse.json({
      success: true,
      totalAmount,
      count: payments.length,
      payments, // optional: return full list
    });
  } catch (err) {
    console.error("❌ Error fetching payments:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
