'use client'
import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
// import useNotesStore from '@/store/useNotesStore'
import { StickyNote } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'

const Notes = () => {
    // const { notes, fetchNotes, isNotesFetched } = useNotesStore()
    const router = useRouter()

    // useEffect(() => {
    //     if (!isNotesFetched) {
    //         fetchNotes()
    //     } else {
    //         console.log("✅ Using cached notes, no DB call")
    //     }
    // }, [isNotesFetched, fetchNotes])

    // // ✅ Get unique courses by course_id
    // const uniqueCourses = useMemo(() => {
    //     const map = new Map()
    //     notes.forEach(note => {
    //         if (!map.has(note.course_id)) {
    //             map.set(note.course_id, note) // store first note for each course
    //         }
    //     })
    //     return Array.from(map.values())
    // }, [notes])








    const { notes, fetchNotes } = noteStore()
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes])
    console.log(notes)


    // ✅ Get unique courses by course_id
    const uniqueCourses = useMemo(() => {
        const map = new Map()
        notes.forEach(note => {
            if (!map.has(note.course_id)) {
                map.set(note.course_id, note) // store first note for each course
            }
        })
        return Array.from(map.values())
    }, [notes])
    return (
        <>
            <div className="p-6 md:p-10 bg-sky-50 min-h-screen text-gray-900">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        📘 Courses
                    </h2>
                    <Button variant="secondary" onClick={() => router.push("/")}>
                        Home
                    </Button>
                </div>

                {uniqueCourses.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">No courses found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pl-14 pr-14 mt-28">
                        {uniqueCourses.map((course) => (
                            <Card
                                key={course.course_id}
                                className="shadow-md hover:shadow-lg transition rounded-sm"
                            >
                                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                    <StickyNote className="w-6 h-6 text-purple-600" />
                                    <CardTitle className="text-sm font-semibold">
                                        {course.course_title}
                                    </CardTitle>
                                </CardHeader>

                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full rounded-full"
                                        onClick={() => router.push(`/semistar/${course.course_id}`)}
                                    >
                                        View More
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => router.push("/")}>home page</button>
        </>
    )
}

export default Notes
