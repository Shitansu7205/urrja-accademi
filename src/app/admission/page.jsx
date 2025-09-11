
'use client'
import React, { useState } from 'react';
import { Metadata } from "next";
import { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, RefreshCw, ArrowLeft, Upload } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader"



export default function Admission() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      toast.success("Form submitted successfully");
      localStorage.removeItem("formData");
      setLoading(false);
    } catch (error) {
      toast.error("Error submitting form");
      setLoading(false);
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
    toast.success("Form reset successfully!");
  };



  return (
    <>

      {loading && <Loader />}


      <div className="pt-14 max-w-7xl mx-auto " style={{ backgroundColor: "#F5F6FA" }}>
        {step === 1 && (
          <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 border rounded-sm shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full font-bold shadow-md">1</span>
              <h2 className="text-2xl font-bold md:text-2xl  text-gray-800">
                Personal Details
              </h2>
            </div>




            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Full Name */}
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DOB <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* Aadhar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <Input
                  name="aadhar"
                  placeholder="Enter Aadhar Number"
                  onChange={handleChange}
                  value={formData.aadhar}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Father Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="fatherName"
                  placeholder="Enter Your Father Name"
                  onChange={handleChange}
                  value={formData.fatherName}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* Mother Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mother Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="motherName"
                  placeholder="Enter Your Mother Name"
                  onChange={handleChange}
                  value={formData.motherName}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* Gender (Shadcn Select) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select
                  onValueChange={(value) => handleChange({ target: { name: 'gender', value } })}
                  value={formData.gender}
                >
                  <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-200">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Religion <span className="text-red-500">*</span>
                </label>
                <Select
                  onValueChange={(value) => handleChange({ target: { name: 'religion', value } })}
                  value={formData.religion}
                >
                  <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-200">
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Muslim">Muslim</SelectItem>
                    <SelectItem value="Christian">Christian</SelectItem>
                    <SelectItem value="Sikh">Sikh</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Caste */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Caste <span className="text-red-500">*</span>
                </label>
                <Select
                  onValueChange={(value) => handleChange({ target: { name: 'caste', value } })}
                  value={formData.caste}
                >
                  <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-200">
                    <SelectValue placeholder="Select Caste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>



              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email Id"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                  value={formData.phone}
                  required
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg shadow-sm transition"
                />
              </div>
              {/* Address full-width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  placeholder="Enter Full Address With Pin Code"
                  onChange={handleChange}
                  value={formData.address}
                  required
                  rows={1}
                  className="w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm transition"
                />
              </div>
            </div>

            <div className="mt-9 flex gap-4 justify-center">

              {/* Reset Button */}
              <Button
                onClick={handeleReset}
                className="bg-rose-100 text-rose-700 border border-rose-200 rounded-md px-5 py-2 hover:bg-rose-200 transition-colors shadow-sm"
              >
                <RefreshCw size={16} /> Reset
              </Button>

              {/* Next Button */}
              <Button
                onClick={next}
                className="bg-indigo-600 text-white rounded-md px-5 py-2 hover:bg-indigo-700 transition-colors shadow-md"
              >
                Next <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}


        {step === 2 && (
          <div className="max-w-5xl mx-auto p-6 bg-white border rounded-sm shadow-md">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full font-bold shadow-md">2</span>
              <h2 className="text-2xl font-bold md:text-2xl  text-gray-800">
                Cources and Qualification
              </h2>
            </div>

            {/* Course Selection - Full Width */}
            <div className="mb-4">
              <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Which Course You Want <span className="text-red-500">*</span></Label>
              <RadioGroup
                className="flex gap-4 mt-1"
                value={formData.apply_course}
                onValueChange={(value) => handleChange({ target: { name: "apply_course", value } })}
              >
                {["B.Ed.", "M.Ed.", "BPEd."].map((course) => (
                  <div key={course} className="flex items-center gap-2">
                    <RadioGroupItem value={course} id={course} />
                    <Label htmlFor={course}>{course}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Two-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Admission Year */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Admission Year <span className="text-red-500">*</span></Label>

                <Select
                  value={formData.admission_year}
                  onValueChange={(value) => handleChange({ target: { name: "admission_year", value } })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021",
                      "2021-2022", "2022-2023", "2023-2024", "2024-2025"
                    ].map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* University */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>University/Board <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.university}
                  onValueChange={(value) => handleChange({ target: { name: "university", value } })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select University" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Nagarjuna", "Andhra Kesari", "Andhra", "Yogi Vemana", "Rayalaseema", "Kashmir", "SE"].map((uni) => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Last Qualification Course */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Course <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.past_course}
                  onValueChange={(value) => handleChange({ target: { name: "past_course", value } })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {["BA", "BSC", "MA", "MSC", "B.COM", "M.COM", "B.TECH", "M.TECH", "Others"].map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Subject <span className="text-red-500">*</span></Label>
                <Input
                  name="subject"
                  placeholder="Enter Subject"
                  value={formData.subject || ""}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Methodology 1 */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Methodology 1 <span className="text-red-500">*</span></Label>
                <Input
                  name="pedagogy_1"
                  placeholder="Pedagogy 1"
                  value={formData.pedagogy_1 || ""}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Methodology 2 */}
              <div>
                <Label className={"block text-sm font-semibold text-gray-700 mb-2"}>Methodology 2 <span className="text-red-500">*</span></Label>
                <Input
                  name="pedagogy_2"
                  placeholder="Pedagogy 2"
                  value={formData.pedagogy_2 || ""}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-9 flex gap-4 justify-center">
              {/* Prev Button */}
              <Button
                onClick={prev}
                className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-200 transition-colors shadow-sm"
              >
                <ArrowLeft size={16} /> Prev
              </Button>

              {/* Reset Button */}
              <Button
                onClick={handeleReset}
                className="bg-rose-100 text-rose-700 border border-rose-200 rounded-md px-5 py-2 hover:bg-rose-200 transition-colors shadow-sm"
              >
                <RefreshCw size={16} /> Reset
              </Button>

              {/* Next Button */}
              <Button
                onClick={next}
                className="bg-indigo-600 text-white rounded-md px-5 py-2 hover:bg-indigo-700 transition-colors shadow-md"
              >
                Next <ArrowRight size={16} />
              </Button>
            </div>


          </div>

        )}


        {step === 3 && (

          <div className="max-w-7xl mx-auto p-5 bg-white border rounded-sm shadow-md">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full font-bold shadow-md">3</span>
              <h2 className="text-2xl font-bold md:text-2xl  text-gray-800">
                Educational Qualifications
              </h2>
            </div>

            <div className="overflow-x-auto  shadow-sm">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Sr No</th>
                    <th className="px-4 py-3">Course <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Stream <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Board/University <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Passout Year & Month <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Roll No <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Full Mark <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">Obtained Mark <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3">%</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, course: "10th" },
                    { id: 2, course: "12th" },
                    { id: 3, course: "Graduation" },
                    { id: 4, course: "PG" },
                    { id: 5, course: "Other" },
                  ].map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
                    >
                      <td className="px-4 py-2 font-medium">{row.id}</td>
                      <td className="px-4 py-2 font-medium">{row.course}</td>

                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          name={`stream_${row.id}`}
                          placeholder="Stream"
                          value={formData[`stream_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          name={`board_${row.id}`}
                          placeholder="Board/University"
                          value={formData[`board_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          name={`passout_year_${row.id}`}
                          placeholder="20xx & Month"
                          value={formData[`passout_year_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          name={`roll_no_${row.id}`}
                          value={formData[`roll_no_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          name={`full_mark_${row.id}`}
                          value={formData[`full_mark_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          name={`obtained_mark_${row.id}`}
                          value={formData[`obtained_mark_${row.id}`] || ""}
                          onChange={handleChange}
                        />
                      </td>

                      <td className="px-4 py-3 font-semibold text-red-600">
                        {formData[`full_mark_${row.id}`] && formData[`obtained_mark_${row.id}`]
                          ? `${((Number(formData[`obtained_mark_${row.id}`]) / Number(formData[`full_mark_${row.id}`])) * 100).toFixed(2)}%`
                          : "0%"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Navigation */}
            <div className="mt-9 flex gap-4 justify-center">
              {/* Prev Button */}
              <Button
                onClick={prev}
                className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-200 transition-colors shadow-sm"
              >
                <ArrowLeft size={16} /> Prev
              </Button>

              {/* Reset Button */}
              <Button
                onClick={handeleReset}
                className="bg-rose-100 text-rose-700 border border-rose-200 rounded-md px-5 py-2 hover:bg-rose-200 transition-colors shadow-sm"
              >
                <RefreshCw size={16} /> Reset
              </Button>

              {/* Next Button */}
              <Button
                onClick={next}
                className="bg-indigo-600 text-white rounded-md px-5 py-2 hover:bg-indigo-700 transition-colors shadow-md"
              >
                Next <ArrowRight size={16} />
              </Button>
            </div>
          </div>


        )}

        {step === 4 && (
          <div className="max-w-7xl mx-auto p-6 bg-white border rounded-sm shadow-md space-y-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full font-bold shadow-md">4</span>
              <h2 className="text-2xl font-bold md:text-2xl  text-gray-800">
                Upload Documents
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* Passport Photo */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" /> Passport Photo <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, passport_photo: e.target.files[0] })
                  }
                />
              </div>

              {/* Signature */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" /> Signature <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, signature: e.target.files[0] })
                  }
                />
              </div>

              {/* 10th Mark Sheet */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-green-600" /> 10th Mark Sheet <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_10: e.target.files[0] })
                  }
                />
                {formData.mark_10 && (
                  <p className="text-sm mt-1 text-gray-600">{formData.mark_10.name}</p>
                )}
              </div>

              {/* 10th Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-green-600" /> 10th Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_10: e.target.files[0] })
                  }
                />
              </div>

              {/* 12th Mark Sheet */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600" /> 12th Mark Sheet <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_12: e.target.files[0] })
                  }
                />
              </div>

              {/* 12th Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600" /> 12th Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_12: e.target.files[0] })
                  }
                />
              </div>

              {/* Graduation Mark Sheet */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-yellow-600" /> +3 Mark Sheet <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_grad: e.target.files[0] })
                  }
                />
              </div>

              {/* Graduation Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-yellow-600" /> +3 Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_grad: e.target.files[0] })
                  }
                />
              </div>

              {/* PG Mark Sheet */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-pink-600" /> PG Mark Sheet
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, mark_pg: e.target.files[0] })
                  }
                />
              </div>

              {/* PG Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-pink-600" /> PG Certificate
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, cert_pg: e.target.files[0] })
                  }
                />
              </div>

              {/* CLC / TC */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-600" /> CLC / TC <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, clc: e.target.files[0] })
                  }
                />
              </div>

              {/* Migration Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-600" /> Migration Certificate
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, migration: e.target.files[0] })
                  }
                />
              </div>

              {/* Aadhaar Card */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-teal-600" /> Aadhaar Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, aadhaar: e.target.files[0] })
                  }
                />
              </div>

              {/* Residence Certificate */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-teal-600" /> Residence Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setFormData({ ...formData, residence: e.target.files[0] })
                  }
                />
              </div>

            </div>
            {/* Navigation */}
            <div className="mt-9 flex gap-4 justify-center">
              {/* Prev Button */}
              <Button
                onClick={prev}
                className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-200 transition-colors shadow-sm"
              >
                <ArrowLeft size={16} /> Previous
              </Button>

              {/* Reset Button */}
              <Button
                onClick={handeleReset}
                className="bg-rose-100 text-rose-700 border border-rose-200 rounded-md px-5 py-2 hover:bg-rose-200 transition-colors shadow-sm"

              >
                <RefreshCw size={16} /> Reset
              </Button>

              {/* Next Button */}
              <Button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white rounded-md px-5 py-2 hover:bg-indigo-700 transition-colors shadow-md"

              >
                Submit <ArrowRight size={16} />
              </Button>
            </div>

          </div>
        )}


      </div>
    </>
  );
}
