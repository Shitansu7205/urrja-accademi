'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'
import { useRouter } from 'next/navigation'

const Allnotes = () => {
    const { course_id, sem_id } = useParams() // get from route
    // const [user, setUser] = useState(null)
    const { notes, fetchNotes } = noteStore()
    const [filteredNotes, setFilteredNotes] = useState([]);
    const router = useRouter()

    // useEffect(() => {
    //     if (!course_id || !sem_id) return

    //     const fetchNotes = async () => {
    //         try {
    //             // hit your existing API using query params
    //             const res = await fetch(`/api/getnotes?course_id=${course_id}&sem_id=${sem_id}`)
    //             const data = await res.json()
    //             setNotes(data.notes || [])
    //             console.log('Fetched Notes:', data)
    //         } catch (error) {
    //             console.error('Error fetching notes:', error)
    //         }
    //     }

    //     fetchNotes()
    // }, [course_id, sem_id])


    // const paymentPageFunction = async (noteId) => {

    //     const token = localStorage.getItem('token') // just get string, no JSON.parse
    //     if (!token) {
    //         alert('Please login first')
    //         window.location.href = '/login'
    //     } else {
    //         const response = await fetch(`/api/pdf-url/${noteId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //         if (data.url) {
    //             window.open(data.url, "_blank"); // opens PDF in new tab
    //         }
    //         // if (data.url) {
    //         //     window.location.href = data.url
    //         // }
    //     }
    // }

    const logOut = () => {
        localStorage.removeItem('token')
        alert('Logged out successfully')
    }
    // console.log("Notes", notes)
    // console.log("Paramas", course_id, sem_id)

    useEffect(() => {
        // fetch notes if not yet fetched
        if (notes.length === 0) {
            fetchNotes();
            return;
        }

        if (!course_id) return; // stop if no course_id in route

        // filter notes by course_id and optional sem_id
        const filtered = notes.filter((item) => {
            const matchCourse = item.course_id === course_id;
            const matchSem = sem_id ? item.semistar === Number(sem_id) : true;
            return matchCourse && matchSem;
        });

        setFilteredNotes(filtered);

        // console.log("Notes:", notes);
        // console.log("Params:", course_id, sem_id);
        console.log("🔥 Filtered notes:", filtered);
    }, [notes, course_id, sem_id, fetchNotes]);






    return (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Notes</h2>
                <button onClick={logOut}>Logout</button>

                {filteredNotes.length === 0 ? (
                    <p>No notes found for this semester</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-red-400 ">
                        {filteredNotes.map(note => (
                            <Card key={note._id} className="shadow-md hover:shadow-lg transition rounded-2xl  pt-0">
                                {/* Image */}
                                {note.img_url && (
                                    <img
                                        src={note.img_url}
                                        alt={note.note_title}
                                        className="w-full h-40 object-cover rounded-t-2xl"
                                    />
                                )}

                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">{note.note_title}</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-600 text-sm">{note.desc}</p>
                                    <p className="font-bold text-purple-600 mt-2">₹ {note.price}</p>
                                </CardContent>

                                <CardFooter className="flex justify-between gap-2">
                                    <Button
                                        className="flex-1"
                                        onClick={() => paymentPageFunction(note._id)}
                                    >
                                        Buy Now
                                    </Button>
                                    <button
                                        onClick={() => window.open(`/api/downloadnotes?id=${note._id}`, "_blank")}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        ⬇️ Download PDF
                                    </button>


                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => router.push('/notes')}>All Notes</button>
        </>
    )
}

export default Allnotes
