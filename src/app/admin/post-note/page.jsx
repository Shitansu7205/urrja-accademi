"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import Loader from "@/components/ui/Loader"
import toast from "react-hot-toast";

export default function UploadNote() {
  const courseOptions = {
    BTech: "BTECH100",
    MTech: "MTECH200",
    BSE: "BSE300",
    BED: "BED400",
  };

  const [form, setForm] = useState({
    note_title: "",
    course_title: "",
    course_id: "",
    semistar: "",
    desc: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCourseChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      course_title: title,
      course_id: courseOptions[title] || "",
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file || !img) return toast.error("File or image missing");

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("file", file);
    formData.append("img", img);

    try {
      const res = await fetch("/api/uploadnotes", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        toast.success("Note uploaded successfully");
        setMessage("✅ Note uploaded!");
        setFile(null);
        setImg(null);
        setForm({
          note_title: "",
          course_title: "",
          course_id: "",
          semistar: "",
          desc: "",
          price: "",
        });
      } else {
        setLoading(false);
        toast.error("Failed to upload note");
        setMessage("❌ Error uploading");
      }
    } catch (err) {
      toast.error("Failed to upload note");
      setMessage("❌ Error uploading");
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) window.location.href = '/admin/login'
  })



  return (
    // <Card className="max-w-2xl mx-auto p-6 mt-8 shadow-lg">
    //   <CardContent className="flex flex-col gap-4">
    //     <h2 className="text-2xl font-semibold text-center">Upload Note</h2>

    //     <form onSubmit={handleUpload} className="flex flex-col gap-4">
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //         <div>
    //           <Label>Note Title</Label>
    //           <Input name="note_title" value={form.note_title} onChange={handleChange} required />
    //         </div>

    //         <div>
    //           <Label>Course Title</Label>
    //           <select
    //             value={form.course_title}
    //             onChange={handleCourseChange}
    //             className="w-full border rounded px-3 py-2"
    //             required
    //           >
    //             <option value="">Select Course</option>
    //             {Object.keys(courseOptions).map((course) => (
    //               <option key={course} value={course}>
    //                 {course}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <div>
    //           <Label>Course ID</Label>
    //           <Input name="course_id" value={form.course_id} readOnly />
    //         </div>

    //         <div>
    //           <Label>Semistar</Label>
    //           <Input
    //             name="semistar"
    //             type="number"
    //             value={form.semistar}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>

    //         <div className="md:col-span-2">
    //           <Label>Description</Label>
    //           <Input name="desc" value={form.desc} onChange={handleChange} required />
    //         </div>

    //         <div>
    //           <Label>Price</Label>
    //           <Input
    //             name="price"
    //             type="number"
    //             value={form.price}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
    //       </div>

    //       {/* File Uploads */}
    //       <div className="flex flex-col md:flex-row gap-4 mt-2">
    //         <div className="flex-1">
    //           <Label>PDF File</Label>
    //           <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
    //           {file && (
    //             <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
    //               <p className="truncate">{file.name}</p>
    //               <Button variant="destructive" size="sm" onClick={() => setFile(null)}>
    //                 <X size={16} />
    //               </Button>
    //             </div>
    //           )}
    //         </div>

    //         <div className="flex-1">
    //           <Label>Image Thumbnail</Label>
    //           <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
    //           {img && (
    //             <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
    //               <p className="truncate">{img.name}</p>
    //               <Button variant="destructive" size="sm" onClick={() => setImg(null)}>
    //                 <X size={16} />
    //               </Button>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
    //         Upload Note
    //       </Button>
    //     </form>

    //     {message && <p className="text-center mt-2">{message}</p>}
    //   </CardContent>
    // </Card>
    <>


      {loading && <Loader />}
      <Card className="max-w-3xl mx-auto mt-10 shadow-xl border border-gray-200 rounded-2xl">

        <CardContent className="flex flex-col gap-6 p-6">
          <form onSubmit={handleUpload} className="flex flex-col gap-6">
            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Note Title</Label>
                <Input
                  name="note_title"
                  value={form.note_title}
                  onChange={handleChange}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Course Title</Label>
                <select
                  value={form.course_title}
                  onChange={handleCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Course</option>
                  {Object.keys(courseOptions).map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Course ID</Label>
                <Input name="course_id" value={form.course_id} readOnly />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Semester</Label>
                <Input
                  name="semistar"
                  type="number"
                  value={form.semistar}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <Label>Description</Label>
                <Input
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Short description about this note"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>PDF File</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <div className="mt-2 flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2">
                    <p className="truncate text-sm">{file.name}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Image Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                {img && (
                  <div className="mt-2 flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2">
                    <p className="truncate text-sm">{img.name}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setImg(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg shadow-md transition-all"
            >
              Upload Note
            </Button>
          </form>

          {message && (
            <p className="text-center mt-4 text-sm font-medium text-purple-600">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </>


  );
}

