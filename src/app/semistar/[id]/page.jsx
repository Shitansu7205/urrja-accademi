'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Semistar = () => {
    const { id } = useParams()  // course_id passed from previous page
    const [semesters, setSemesters] = useState([])
    const [uniqueCourses, setUniqueCourses] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!id) return
        // if (id) console.log('Course ID:', id)

        const fetchSemesters = async () => {
            try {
                const response = await fetch(`/api/semistar/${id}`, {
                    method: 'GET',
                })
                const data = await response.json()
                console.log('Semesters:', data)

                // Filter unique semesters (by semistar number)
                const uniqueSemesters = Array.from(
                    new Map((data.semesters || []).map(sem => [sem.semistar, sem])).values()
                )

                setSemesters(uniqueSemesters)
            } catch (error) {
                console.error('Error fetching semesters:', error)
            }
        }

        fetchSemesters()
    }, [id])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Semesters</h2>

            {semesters.length === 0 ? (
                <p>No semesters found</p>
            ) : (
                <ul className="space-y-2">
                    {semesters.map((sem) => (
                        <li key={sem._id} className="p-2 border rounded hover:bg-gray-100">
                            Sem {sem.semistar}
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() =>
                                    router.push(`/allnotes/${sem.course_id}/${sem.semistar}`)
                                }
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

export default Semistar
