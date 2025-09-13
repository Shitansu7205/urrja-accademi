'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
// import useNotesStore from '@/store/useNotesStore'
import { StickyNote, Eye, PlayCircle, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose   // ← add this
} from "@/components/ui/dialog";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image";
import Loader from "@/components/ui/Loader"

const Notes = () => {
    // const { notes, fetchNotes, isNotesFetched } = useNotesStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const { notes, fetchNotes } = noteStore()
    // Fetch notes on mount
    useEffect(() => {
        const loadNotes = async () => {
            setLoading(true); // show loader
            await fetchNotes(); // fetch notes
            setLoading(false); // hide loader after fetching
        };

        if (notes.length === 0) {
            loadNotes();
        } else {
            setLoading(false); // already have notes
        }
    }, [fetchNotes, notes.length]);


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
            {loading && <Loader />}
            <div className="p-6 md:p-10 min-h-0 text-gray-900 pt-0">
                <div className='pl-32'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink >Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>All Notes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {uniqueCourses.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">No courses found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pl-30 pr-30 mt-10">
                        {uniqueCourses.map((course) => (
                            <Card
                                key={course.course_id}
                                className="w-[270px] bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200 flex flex-col "
                            >

                                <CardHeader className="flex items-center justify-between gap-4 px-4 py-3">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                                            <StickyNote className="w-5 h-5" />
                                        </div>
                                        <CardTitle className="text-base font-semibold text-gray-800">
                                            {course.course_title}
                                        </CardTitle>
                                    </div>
                                    <span className="flex items-center gap-1 px-3 py-1 text-white bg-blue-400 font-semibold rounded-full text-xs">
                                        Notes: {course.total_notes || 10}
                                    </span>
                                </CardHeader>



                                <CardFooter className="px-4  pt-0 flex justify-start">
                                    <div className="flex gap-2">
                                        {/* View More Button */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-1 px-3 py-1 text-xs rounded-sm border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                            onClick={() => router.push(`/semistar/${course.course_id}`)}
                                        >
                                            <Eye className="w-4 h-4" /> View More
                                        </Button>

                                        {/* Demo Dialog Button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-sm border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                                >
                                                    <PlayCircle className="w-4 h-4" /> Preview
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-fit p-0 border-none bg-transparent shadow-none">
                                                <DialogHeader>
                                                    <DialogTitle className="sr-only">Course Demo</DialogTitle>
                                                    <DialogDescription className="sr-only">
                                                        Preview image of the course demo
                                                    </DialogDescription>
                                                    <DialogClose asChild>
                                                        <button className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:text-gray-700">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </DialogClose>
                                                </DialogHeader>

                                                <Image
                                                    src={course.img_url}
                                                    alt="Course Demo"
                                                    width={800}
                                                    height={400}
                                                    className="rounded-md"
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Notes
