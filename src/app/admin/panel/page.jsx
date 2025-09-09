'use client'
import React, { useEffect, useState } from 'react'
import noteStore from '@/store/noteStore'
import { Button } from '@/components/ui/button'
import { FileText, Edit3, Trash2 } from "lucide-react"; // Lucide React icons
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader"



const Panel = () => {
    const notes = noteStore((state) => state.notes)
    const fetchNotes = noteStore((state) => state.fetchNotes)
    const deleteNote = noteStore((state) => state.deleteNote)
    const editNote = noteStore((state) => state.editNote)

    const [loading, setLoading] = useState(false)
    const [editingNote, setEditingNote] = useState(null);
    const [formData, setFormData] = useState({
        note_title: "",
        desc: "",
        price: 0,
    });

    // useEffect(() => {
    //     setLoading(true)
    //     const token = localStorage.getItem('token')
    //     if (!token) window.location.href = '/admin/login'
    //     else fetchNotes()
    //     setLoading(false)
    // }, [fetchNotes])

    useEffect(() => {
        const loadNotes = async () => {
            setLoading(true)
            const token = localStorage.getItem('token')
            if (!token) {
                window.location.href = '/admin/login'
            } else {
                try {
                    await fetchNotes() // wait for notes to load
                } catch (err) {
                    console.error(err)
                    toast.error("Failed to fetch notes")
                }
            }
            setLoading(false)
        }

        loadNotes()
    }, [fetchNotes])


    const handleDelete = (id) => {
        if (!confirm('Are you sure?')) return
        deleteNote(id)
        toast.success("Note deleted successfully")
    }





    const handleEditClick = (id) => {
        const noteToEdit = notes.find((n) => n._id === id);
        if (!noteToEdit) return;

        setEditingNote(noteToEdit);
        setFormData({
            note_title: noteToEdit.note_title,
            desc: noteToEdit.desc,
            price: noteToEdit.price,
        });
    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!editingNote) return;

        await editNote(editingNote._id, formData); // store function to update backend & state
        toast.success("Note updated successfully");
        setEditingNote(null); // close modal
    };


    return (
        <>
            {loading && <Loader />}
            <div className="px-6 py-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Admin Panel</h1>

                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => (window.location.href = '/admin/post-note')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1"
                    >
                        <span className="text-xl">➕</span> Post New Note
                    </button>
                </div>

                <div className="flex justify-center p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px]">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={note.img_url || "https://placehold.co/400x300"}
                                        alt={note.note_title}
                                        className="w-full h-48 object-cover"
                                    />

                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                    {/* Title & Description */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                                            {note.note_title}
                                        </h3>
                                        <p className="text-gray-500 mt-1 line-clamp-2">{note.desc}</p>
                                    </div>

                                    {/* Badges Row */}
                                    <div className="flex justify-between gap-2 flex-wrap mt-2">
                                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full text-xs">
                                            💰 ${note.price || 0}
                                        </span>
                                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 font-semibold rounded-full text-xs">
                                            🎓 Semester {note.semistar || 0}
                                        </span>
                                        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-xs">
                                            📚 {note.course_title || "N/A"}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-md transition"
                                            onClick={() => handleEditClick(note._id)}
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-800 rounded-md transition"
                                            onClick={() => handleDelete(note._id)}
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




                {editingNote && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <form
                            onSubmit={handleFormSubmit}
                            className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5 transform transition-all scale-95 animate-scaleIn"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Edit Note
                            </h2>

                            {/* Title */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="note_title"
                                    value={formData.note_title}
                                    onChange={handleFormChange}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleFormChange}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition resize-none"
                                    rows={4}
                                />
                            </div>

                            {/* Price */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingNote(null)}
                                    className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}


            </div>

        </>


    )
}

export default Panel
