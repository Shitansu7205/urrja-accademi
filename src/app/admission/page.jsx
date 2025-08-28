'use client'
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function Admission() {
  const [step, setStep] = useState(1);

  // ✅ Always initialize every field with an empty string (never undefined)
  const [formData, setFormData] = useState({
    // First step form
    name: "",
    dob: "",
    aadhar: "",
    fatherName: "",
    motherName: "",
    gender: "",
    religion: "",
    caste: "",
    address: "",
    email: "",
    phone: "",
    // First step form

    // step 2 fields
    apply_course: "",
    admission_year: "",
    university: "",
    past_course: "",
    subject: "",
    pedagogy_1: "",
    pedagogy_2: "",
    // step 2 fields

    // Step 3  fields
    stream_1: "", board_1: "", passout_year_1: "", roll_no_1: "", full_mark_1: "", obtained_mark_1: "",
    stream_2: "", board_2: "", passout_year_2: "", roll_no_2: "", full_mark_2: "", obtained_mark_2: "",
    stream_3: "", board_3: "", passout_year_3: "", roll_no_3: "", full_mark_3: "", obtained_mark_3: "",
    stream_4: "", board_4: "", passout_year_4: "", roll_no_4: "", full_mark_4: "", obtained_mark_4: "",
    stream_5: "", board_5: "", passout_year_5: "", roll_no_5: "", full_mark_5: "", obtained_mark_5: "",
    // Step 3  fields

    // Step 4: File uploads
    passport_photo: null,
    signature: null,
    mark_10: null,
    cert_10: null,
    mark_12: null,
    cert_12: null,
    mark_grad: null,
    cert_grad: null,
    mark_pg: null,
    cert_pg: null,
    clc: null,
    migration: null,
    aadhaar: null,
    residence: null,
    // Step 4: File uploads


  });

  // ✅ Go forward/backward
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? (e.target.multiple ? Array.from(files) : files[0]) : value,
    }));
  };

  // ✅ Load from localStorage (only once)
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData((prev) => ({
        ...prev,
        ...JSON.parse(savedData)
      }));
    }
  }, []);

  // ✅ Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);






  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && !(formData[key] instanceof File)) {
          data.append(key, formData[key]);
        }
      });

      // append all file fields dynamically
      Object.keys(formData).forEach((key) => {
        if (formData[key] instanceof File) {
          data.append(key, formData[key]);
        }
      });

      const res = await fetch("/api/admission", {
        method: "POST",
        body: data, // 👈 no JSON.stringify, no content-type header
      });

      const result = await res.json();
      console.log("Form submitted:", result);
      alert("Form submitted successfully!");
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
















































  const handeleReset = () => {
    setFormData({
      // First step form
      name: "",
      dob: "",
      aadhar: "",
      fatherName: "",
      motherName: "",
      gender: "",
      religion: "",
      caste: "",
      address: "",
      email: "",
      phone: "",
      // First step form

      // step 2 fields
      apply_course: "",
      admission_year: "",
      university: "",
      past_course: "",
      subject: "",
      pedagogy_1: "",
      pedagogy_2: "",
      // step 2 fields

      // Step 3  fields
      stream_1: "", board_1: "", passout_year_1: "", roll_no_1: "", full_mark_1: "", obtained_mark_1: "",
      stream_2: "", board_2: "", passout_year_2: "", roll_no_2: "", full_mark_2: "", obtained_mark_2: "",
      stream_3: "", board_3: "", passout_year_3: "", roll_no_3: "", full_mark_3: "", obtained_mark_3: "",
      stream_4: "", board_4: "", passout_year_4: "", roll_no_4: "", full_mark_4: "", obtained_mark_4: "",
      stream_5: "", board_5: "", passout_year_5: "", roll_no_5: "", full_mark_5: "", obtained_mark_5: "",
      // Step 3  fields

      // Step 4: File uploads
      passport_photo: null,
      signature: null,
      mark_10: null,
      cert_10: null,
      mark_12: null,
      cert_12: null,
      mark_grad: null,
      cert_grad: null,
      mark_pg: null,
      cert_pg: null,
      clc: null,
      migration: null,
      aadhaar: null,
      residence: null,
      // Step 4: File uploads

    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {step === 1 && (
        <div>
          <h2 className="text-xl mb-2">Step 1: Personal Details</h2>

          {/* Full Name */}
          <label className="block mb-1">Your Full Name (as per 10th Cert) *</label>
          <input
            name="name"
            placeholder="Enter Your Name"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.name}
            required
          />

          {/* DOB */}
          <label className="block mb-1">DOB *</label>
          <input
            type="date"
            name="dob"
            placeholder="dd-mm-yyyy"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.dob}
            required
          />

          {/* Aadhar */}
          <label className="block mb-1">Aadhar Number *</label>
          <input
            name="aadhar"
            placeholder="Enter Aadhar Number"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.aadhar}
            required
          />

          {/* Father Name */}
          <label className="block mb-1">Father Name *</label>
          <input
            name="fatherName"
            placeholder="Enter Your Father Name"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.fatherName}
            required
          />

          {/* Mother Name */}
          <label className="block mb-1">Mother Name *</label>
          <input
            name="motherName"
            placeholder="Enter Your Mother Name"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.motherName}
            required
          />

          {/* Gender */}
          <label className="block mb-1">Gender *</label>
          <select
            name="gender"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.gender}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Religion */}
          <label className="block mb-1">Religion *</label>
          <select
            name="religion"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.religion}
            required
          >
            <option value="">Select Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Other">Other</option>
          </select>

          {/* Caste */}
          <label className="block mb-1">Caste *</label>
          <select
            name="caste"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.caste}
            required
          >
            <option value="">Select Caste</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>

          {/* Address */}
          <label className="block mb-1">Address *</label>
          <textarea
            name="address"
            placeholder="Enter Full Address With Pin Code"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.address}
            required
          />

          {/* Email */}
          <label className="block mb-1">Email Id *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Id (small letters)"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.email}
            required
          />

          {/* Phone Number */}
          <label className="block mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            value={formData.phone}
            required
          />

          <button
            onClick={next}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}


      {step === 2 && (
        <div>
          <h2 className="text-xl mb-2">Step 2: Course & Qualification</h2>

          {/* Which Course You Want */}
          <label className="block font-medium text-gray-700 mb-1">
            Which Course You Want <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mb-4">
            {["B.Ed.", "M.Ed.", "BPEd."].map((course) => (
              <label key={course} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="apply_course"
                  value={course}
                  checked={formData.apply_course === course}
                  onChange={handleChange}
                  className="accent-violet-500"
                />
                {course}
              </label>
            ))}
          </div>

          {/* Admission Year */}
          <label className="block font-medium text-gray-700 mb-1">
            Admission Year <span className="text-red-500">*</span>
          </label>
          <select
            name="admission_year"
            value={formData.admission_year || ""}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-4"
          >
            <option value="" disabled>
              Select Year
            </option>
            {[
              "2016-2017",
              "2017-2018",
              "2018-2019",
              "2019-2020",
              "2020-2021",
              "2021-2022",
              "2022-2023",
              "2023-2024",
              "2024-2025",
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* University */}
          <label className="block font-medium text-gray-700 mb-1">
            Which University/Board You Want <span className="text-red-500">*</span>
          </label>
          <select
            name="university"
            value={formData.university || ""}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-4"
          >
            <option value="" disabled>
              Select University
            </option>
            {[
              "Nagarjuna",
              "Andhra Kesari",
              "Andhra",
              "Yogi Vemana",
              "Rayalaseema",
              "Kashmir",
              "SE",
            ].map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>

          {/* Last Qualification Details */}
          <h3 className="text-lg font-semibold mb-2">Enter Last Qualification Details</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Past Course */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                name="past_course"
                value={formData.past_course || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="" disabled>
                  Select Course
                </option>
                {[
                  "BA",
                  "BSC",
                  "MA",
                  "MSC",
                  "B.COM",
                  "M.COM",
                  "B.TECH",
                  "M.TECH",
                  "Others",
                ].map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={formData.subject || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Methodology */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Methodology 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pedagogy_1"
                placeholder="Pedagogy 1"
                value={formData.pedagogy_1 || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Methodology 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pedagogy_2"
                placeholder="Pedagogy 2"
                value={formData.pedagogy_2 || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prev}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={next}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}


      {step === 3 && (
        <div>
          <h2 className="text-xl mb-2">Step 3: Educational Qualifications</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border">
              <thead className="text-sm text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Sr No</th>
                  <th className="px-4 py-2">Course *</th>
                  <th className="px-4 py-2">Stream *</th>
                  <th className="px-4 py-2">Board/University *</th>
                  <th className="px-4 py-2">Passout Year & Month *</th>
                  <th className="px-4 py-2">Roll No *</th>
                  <th className="px-4 py-2">Full Mark *</th>
                  <th className="px-4 py-2">Obtained Mark *</th>
                  <th className="px-4 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, course: "10th" },
                  { id: 2, course: "12th" },
                  { id: 3, course: "Graduation" },
                  { id: 4, course: "PG" },
                  { id: 5, course: "Other" },
                ].map((row) => (
                  <tr key={row.id} className="border">
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{row.course}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name={`stream_${row.id}`}
                        placeholder="Stream"
                        value={formData[`stream_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name={`board_${row.id}`}
                        placeholder="Board/University"
                        value={formData[`board_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name={`passout_year_${row.id}`}
                        placeholder="20xx & Month"
                        value={formData[`passout_year_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name={`roll_no_${row.id}`}
                        value={formData[`roll_no_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        name={`full_mark_${row.id}`}
                        value={formData[`full_mark_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        name={`obtained_mark_${row.id}`}
                        value={formData[`obtained_mark_${row.id}`] || ""}
                        onChange={handleChange}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {formData[`full_mark_${row.id}`] && formData[`obtained_mark_${row.id}`]
                        ? `${(
                          (Number(formData[`obtained_mark_${row.id}`]) /
                            Number(formData[`full_mark_${row.id}`])) *
                          100
                        ).toFixed(2)}%`
                        : "0%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={prev}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl mb-2">Step 4: Upload Documents</h2>

          <div className="space-y-6">
            {/* Passport Photo & Signature */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">Passport Photo *</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({ ...formData, passport_photo: e.target.files[0] })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Signature *</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({ ...formData, signature: e.target.files[0] })
                  }
                />

              </div>
            </div>




            {/* 10th Documents */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">10th Mark Sheet *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_10: e.target.files[0] })
                  }
                />
                {formData.mark_10 && <p>Uploaded: {formData.mark_10.name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">10th Certificate *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_10: e.target.files[0] })
                  }
                />
                {/* {formData.cert_10 && <p>Uploaded: {formData.cert_10.name}</p>} */}
              </div>
            </div>

            {/* 12th Documents */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">12th Mark Sheet *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_12: e.target.files[0] })
                  }
                />
                {/* {formData.mark_12 && <p>Uploaded: {formData.mark_12.name}</p>} */}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">12th Certificate *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_12: e.target.files[0] })
                  }
                />
                {/* {formData.cert_12 && <p>Uploaded: {formData.cert_12.name}</p>} */}
              </div>
            </div>

            {/* Graduation */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">+3 Mark Sheet *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_grad: e.target.files[0] })
                  }
                />
                {/* {formData.mark_grad && <p>Uploaded: {formData.mark_grad.name}</p>} */}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">+3 Certificate *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_grad: e.target.files[0] })
                  }
                />
                {/* {formData.cert_grad && <p>Uploaded: {formData.cert_grad.name}</p>} */}
              </div>
            </div>

            {/* PG (Optional) */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">PG Mark Sheet</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_pg: e.target.files[0] })
                  }
                />
                {/* {formData.mark_pg && <p>Uploaded: {formData.mark_pg.name}</p>} */}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">PG Certificate</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_pg: e.target.files[0] })
                  }
                />
                {/* {formData.cert_pg && <p>Uploaded: {formData.cert_pg.name}</p>} */}
              </div>
            </div>

            {/* CLC & Migration */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">CLC / TC *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, clc: e.target.files[0] })
                  }
                />
                {/* {formData.clc && <p>Uploaded: {formData.clc.name}</p>} */}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Migration Certificate</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, migration: e.target.files[0] })
                  }
                />
                {/* {formData.migration && <p>Uploaded: {formData.migration.name}</p>} */}
              </div>
            </div>

            {/* Aadhaar & Residence */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="font-medium">Aadhaar Card *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, aadhaar: e.target.files[0] })
                  }
                />
                {/* {formData.aadhaar && <p>Uploaded: {formData.aadhaar.name}</p>} */}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Residence Certificate *</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, residence: e.target.files[0] })
                  }
                />
                {/* {formData.residence && <p>Uploaded: {formData.residence.name}</p>} */}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prev}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}




      <button
        onClick={handeleReset}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
