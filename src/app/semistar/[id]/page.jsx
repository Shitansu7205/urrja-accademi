'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useNotesStore from '@/store/useNotesStore'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'

const Semistar = () => {
    const { id } = useParams()
    const router = useRouter()
    const { notes, fetchNotes } = noteStore()
    const [uniqueSemesters, setUniqueSemesters] = useState([])

    // const { semesters, fetchSemesters } = useNotesStore()

    // // fetch semesters when course id changes
    // useEffect(() => {
    //     if (id) {
    //         fetchSemesters(id)
    //     }
    // }, [id, fetchSemesters])

    // filter + sort unique semesters whenever store updates
    // Filter + extract unique semesters whenever notes or id changes
    useEffect(() => {
        // if notes not yet fetched, fetch them
        if (notes.length === 0) {
            fetchNotes();
            return;
        }

        if (!id) return;

        // 1. Filter notes by course_id
        const filtered = notes.filter((note) => note.course_id === id);

        // 2. Extract unique semesters from filtered notes
        const unique = Array.from(
            new Map(filtered.map((note) => [note.semistar, note])).values()
        ).sort((a, b) => a.semistar - b.semistar);

        setUniqueSemesters(unique);
    }, [id, notes]);

    // console.log("All Notes:", notes);
    // console.log("Filtered Notes:", notes.filter((n) => n.course_id === id));
    // console.log("Unique Semesters:", uniqueSemesters);

    return (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-6">📚 Semesters</h2>
                <button className="mb-4" onClick={() => router.back()}>Back</button>
                {uniqueSemesters.length === 0 ? (
                    <p className="text-gray-500">No semesters found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-20">
                        {[...uniqueSemesters]
                            .sort((a, b) => a.semistar - b.semistar) // ascending order
                            .map((sem) => (
                                <Card
                                    key={sem._id}
                                    className="shadow-md hover:shadow-lg transition rounded-xl"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">
                                            Semester {sem.semistar}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-gray-600">
                                            📖 Total Notes: <span className="font-medium">{sem.totalNotes || 0}</span>
                                        </p>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() =>
                                                router.push(`/allnotes/${sem.course_id}/${sem.semistar}`)
                                            }
                                        >
                                            View More
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                )}
            </div>


        </>
    )
}

export default Semistar
