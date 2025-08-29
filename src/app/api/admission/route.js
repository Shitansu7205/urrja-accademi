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
            subject: "🎓 New Admission Form Submission",
            html: `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px; border-radius:10px; max-width:800px; margin:auto;">

      <h2 style="text-align:center; color:#222;">📄 Admission Form Submission</h2>
      <p style="text-align:center; font-size:13px; color:#777;">Below are the details submitted by the applicant.</p>

      <!-- Step 1 -->
      <h3 style="margin-top:20px; color:#444;">👤 Personal Details</h3>
      <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Full Name</td><td style="padding:8px; border:1px solid #ddd;">${data.name}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Date of Birth</td><td style="padding:8px; border:1px solid #ddd;">${data.dob}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Aadhar</td><td style="padding:8px; border:1px solid #ddd;">${data.aadhar}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Father's Name</td><td style="padding:8px; border:1px solid #ddd;">${data.fatherName}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Mother's Name</td><td style="padding:8px; border:1px solid #ddd;">${data.motherName}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Gender</td><td style="padding:8px; border:1px solid #ddd;">${data.gender}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Religion</td><td style="padding:8px; border:1px solid #ddd;">${data.religion}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Caste</td><td style="padding:8px; border:1px solid #ddd;">${data.caste}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Address</td><td style="padding:8px; border:1px solid #ddd;">${data.address}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Email</td><td style="padding:8px; border:1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Phone</td><td style="padding:8px; border:1px solid #ddd;">${data.phone}</td></tr>
      </table>

      <!-- Step 2 -->
      <h3 style="margin-top:30px; color:#444;">🎯 Course Details</h3>
      <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Applied Course</td><td style="padding:8px; border:1px solid #ddd;">${data.apply_course}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Admission Year</td><td style="padding:8px; border:1px solid #ddd;">${data.admission_year}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">University</td><td style="padding:8px; border:1px solid #ddd;">${data.university}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Past Course</td><td style="padding:8px; border:1px solid #ddd;">${data.past_course}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Subject</td><td style="padding:8px; border:1px solid #ddd;">${data.subject}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Pedagogy 1</td><td style="padding:8px; border:1px solid #ddd;">${data.pedagogy_1}</td></tr>
        <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">Pedagogy 2</td><td style="padding:8px; border:1px solid #ddd;">${data.pedagogy_2}</td></tr>
      </table>

      <!-- Step 3 -->
      <h3 style="margin-top:30px; color:#444;">📚 Educational Qualifications</h3>
      <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <thead>
          <tr style="background:#eee;">
            <th style="padding:8px; border:1px solid #ddd;">Course</th>
            <th style="padding:8px; border:1px solid #ddd;">Stream</th>
            <th style="padding:8px; border:1px solid #ddd;">Board</th>
            <th style="padding:8px; border:1px solid #ddd;">Passout</th>
            <th style="padding:8px; border:1px solid #ddd;">Roll No</th>
            <th style="padding:8px; border:1px solid #ddd;">Full Marks</th>
            <th style="padding:8px; border:1px solid #ddd;">Obtained</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:8px; border:1px solid #ddd;">10th</td><td>${data.stream_1}</td><td>${data.board_1}</td><td>${data.passout_year_1}</td><td>${data.roll_no_1}</td><td>${data.full_mark_1}</td><td>${data.obtained_mark_1}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;">12th</td><td>${data.stream_2}</td><td>${data.board_2}</td><td>${data.passout_year_2}</td><td>${data.roll_no_2}</td><td>${data.full_mark_2}</td><td>${data.obtained_mark_2}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;">Graduation</td><td>${data.stream_3}</td><td>${data.board_3}</td><td>${data.passout_year_3}</td><td>${data.roll_no_3}</td><td>${data.full_mark_3}</td><td>${data.obtained_mark_3}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;">PG</td><td>${data.stream_4}</td><td>${data.board_4}</td><td>${data.passout_year_4}</td><td>${data.roll_no_4}</td><td>${data.full_mark_4}</td><td>${data.obtained_mark_4}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;">Other</td><td>${data.stream_5}</td><td>${data.board_5}</td><td>${data.passout_year_5}</td><td>${data.roll_no_5}</td><td>${data.full_mark_5}</td><td>${data.obtained_mark_5}</td></tr>
        </tbody>
      </table>

      <p style="margin-top:20px; font-size:12px; color:#555; text-align:center;">This email was automatically generated from the admission form.</p>
    </div>
  `,
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
