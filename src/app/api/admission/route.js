import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req) {
    try {
        const formData = await req.formData(); 

        // ✅ Extract all text fields
        const data = {
            // Step 1
            name: formData.get("name") || "",
            dob: formData.get("dob") || "",
            aadhar: formData.get("aadhar") || "",
            fatherName: formData.get("fatherName") || "",
            motherName: formData.get("motherName") || "",
            gender: formData.get("gender") || "",
            religion: formData.get("religion") || "",
            caste: formData.get("caste") || "",
            address: formData.get("address") || "",
            email: formData.get("email") || "",
            phone: formData.get("phone") || "",

            // Step 2
            apply_course: formData.get("apply_course") || "",
            admission_year: formData.get("admission_year") || "",
            university: formData.get("university") || "",
            past_course: formData.get("past_course") || "",
            subject: formData.get("subject") || "",
            pedagogy_1: formData.get("pedagogy_1") || "",
            pedagogy_2: formData.get("pedagogy_2") || "",

            // Step 3
            stream_1: formData.get("stream_1") || "",
            board_1: formData.get("board_1") || "",
            passout_year_1: formData.get("passout_year_1") || "",
            roll_no_1: formData.get("roll_no_1") || "",
            full_mark_1: formData.get("full_mark_1") || "",
            obtained_mark_1: formData.get("obtained_mark_1") || "",

            stream_2: formData.get("stream_2") || "",
            board_2: formData.get("board_2") || "",
            passout_year_2: formData.get("passout_year_2") || "",
            roll_no_2: formData.get("roll_no_2") || "",
            full_mark_2: formData.get("full_mark_2") || "",
            obtained_mark_2: formData.get("obtained_mark_2") || "",

            stream_3: formData.get("stream_3") || "",
            board_3: formData.get("board_3") || "",
            passout_year_3: formData.get("passout_year_3") || "",
            roll_no_3: formData.get("roll_no_3") || "",
            full_mark_3: formData.get("full_mark_3") || "",
            obtained_mark_3: formData.get("obtained_mark_3") || "",

            stream_4: formData.get("stream_4") || "",
            board_4: formData.get("board_4") || "",
            passout_year_4: formData.get("passout_year_4") || "",
            roll_no_4: formData.get("roll_no_4") || "",
            full_mark_4: formData.get("full_mark_4") || "",
            obtained_mark_4: formData.get("obtained_mark_4") || "",

            stream_5: formData.get("stream_5") || "",
            board_5: formData.get("board_5") || "",
            passout_year_5: formData.get("passout_year_5") || "",
            roll_no_5: formData.get("roll_no_5") || "",
            full_mark_5: formData.get("full_mark_5") || "",
            obtained_mark_5: formData.get("obtained_mark_5") || "",
        };


        // ✅ Extract files separately
        const files = {
            passport_photo: formData.get("passport_photo"),
            signature: formData.get("signature"),
            mark_10: formData.get("mark_10"),
            cert_10: formData.get("cert_10"),
            mark_12: formData.get("mark_12"),
            cert_12: formData.get("cert_12"),
            mark_grad: formData.get("mark_grad"),
            cert_grad: formData.get("cert_grad"),
            mark_pg: formData.get("mark_pg"),
            cert_pg: formData.get("cert_pg"),
            clc: formData.get("clc"),
            migration: formData.get("migration"),
            aadhaar: formData.get("aadhaar"),
            residence: formData.get("residence"),
        };


        console.log("Text fields:", data);
        console.log("Files:", files);

        // 🚀 process (save to DB, upload to cloud storage, etc.)


        // ✅ Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Build text content
        let textContent = "Form Submission Details:\n\n";
        for (let key in data) {
            textContent += `${key}: ${data[key]}\n`;
        }

        // Build attachments
        const attachments = [];
        for (let key in files) {
            const file = files[key];
            if (file && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                attachments.push({
                    filename: file.name || `${key}.pdf`,
                    content: buffer,
                });
            }
        }

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "shitansu.gochhayat@bookingjini.co",
            subject: "New Form Submission",
            text: textContent,
            attachments,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent with attachments!");









        return NextResponse.json({ success: true, message: "Form submitted!" });
    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
