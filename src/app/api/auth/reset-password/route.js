import { NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

// Temporary memory store (lives until server restarts)
const otpStore = new Map();

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { mail } = body;

        console.log("Email:", mail);

        const user = await User.findOne({ email: mail });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Generate OTP
        const otp = generateOTP();
        otpStore.set(mail, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
        });

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // allow self-signed certs
            },
        });

        // Email options
        const mailOptions = {
            from: `"TripStar" <${process.env.EMAIL_USER}>`,
            to: mail,
            subject: "Reset Password - OTP Verification",
            text: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("OTP sent:", otp);

        return NextResponse.json(
            { message: "OTP sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}

// Export otpStore for other routes (like verify OTP)
export { otpStore };
