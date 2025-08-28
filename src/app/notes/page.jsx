'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [uniqueCourses, setUniqueCourses] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notepost', {
                    method: "GET",
                })
                const data = await response.json()
                console.log("Fetched Notes:", data)
                setNotes(data.notes || [])

                // Filter unique courses
                const unique = Array.from(
                    new Map((data.notes || []).map(note => [note.course_id, note])).values()
                )
                setUniqueCourses(unique)
            } catch (error) {
                console.error("Error fetching notes:", error)
            }
        }

        fetchNotes()
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">📘 Courses</h2>

            {uniqueCourses.length === 0 ? (
                <p className="text-gray-500">No courses found</p>
            ) : (
                <ul className="space-y-3">
                    {uniqueCourses.map((note) => (
                        <li key={note._id} className="p-3 border rounded-md shadow-sm flex justify-between items-center">
                            <span className="text-lg font-semibold">{note.course_title}</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => router.push(`/semistar/${note.course_id}`)}
                            >
                                View More
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Notes
