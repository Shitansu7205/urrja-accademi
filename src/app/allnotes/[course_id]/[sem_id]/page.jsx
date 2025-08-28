'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const Allnotes = () => {
    const { course_id, sem_id } = useParams() // get from route
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!course_id || !sem_id) return

        const fetchNotes = async () => {
            try {
                // hit your existing API using query params
                const res = await fetch(`/api/getnotes?course_id=${course_id}&sem_id=${sem_id}`)
                const data = await res.json()
                setNotes(data.notes || [])
                console.log('Fetched Notes:', data)
            } catch (error) {
                console.error('Error fetching notes:', error)
            }
        }

        fetchNotes()
    }, [course_id, sem_id])




    const paymentPageFunction = () => {

        const token = localStorage.getItem('token') // just get string, no JSON.parse
        if (!token) {
            alert('Please login first')
            window.location.href = '/login'
        }else{
            window.location.href = '/payment'
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Notes</h2>

            {notes.length === 0 ? (
                <p>No notes found for this semester</p>
            ) : (
                <ul className="space-y-3">
                    {notes.map(note => (
                        <li
                            key={note._id}
                            className="p-3 border rounded-md shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-2"
                        >
                            {/* Note Title */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{note.note_title}</h3>
                                <p className="text-gray-600">{note.desc}</p>
                            </div>

                            {/* Image */}
                            {note.img_url && (
                                <img
                                    src={note.img_url}
                                    alt={note.note_title}
                                    className="w-32 h-32 object-cover rounded-md mt-2 md:mt-0"
                                />
                            )}

                            {/* Download Button */}
                            {note.file_url && (
                                <button
                                    onClick={paymentPageFunction}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 md:mt-0"
                                >
                                    Buy Now
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

            )}
        </div>
    )
}

export default Allnotes
