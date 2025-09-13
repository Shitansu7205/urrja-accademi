'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
// import useNotesStore from '@/store/useNotesStore'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'
import { StickyNote, Eye, PlayCircle, X } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Loader from "@/components/ui/Loader"

const Semistar = () => {
    const { id } = useParams()
    const router = useRouter()
    const { notes, fetchNotes } = noteStore()
    const [uniqueSemesters, setUniqueSemesters] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
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
        setLoading(false);
    }, [id, notes]);



    return (
        <>
            {loading && <Loader />}
            <div className="p-6 md:p-10 min-h-0 text-gray-900 pt-0">
                <div className='pl-32'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => router.back()}>All Notes</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Semistars</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {uniqueSemesters.length === 0 ? (
                    <p className="text-gray-500">No semesters found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pl-30 pr-30 mt-10">
                        {[...uniqueSemesters]
                            .sort((a, b) => a.semistar - b.semistar) // ascending order
                            .map((sem) => (

                                <Card
                                    key={sem._id}
                                    className="w-[270px] bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200 flex flex-col "
                                >

                                    <CardHeader className="flex items-center justify-between gap-4 px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                                                <StickyNote className="w-5 h-5" />
                                            </div>
                                            <CardTitle className="text-base font-semibold text-gray-800">
                                                Semistar {sem.semistar}
                                            </CardTitle>
                                        </div>
                                        <span className="flex items-center gap-1 px-3 py-1 text-white bg-blue-400 font-semibold rounded-full text-xs">
                                            Notes: {sem.total_notes || 10}
                                        </span>
                                    </CardHeader>



                                    <CardFooter className="px-4  pt-0 flex justify-start">
                                        <div className="flex gap-2">
                                            {/* View More Button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 px-3 py-1 text-xs rounded-sm border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                                                onClick={() => router.push(`/allnotes/${sem.course_id}/${sem.semistar}`)}
                                            >
                                                <Eye className="w-4 h-4" /> View More
                                            </Button>

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

export default Semistar
