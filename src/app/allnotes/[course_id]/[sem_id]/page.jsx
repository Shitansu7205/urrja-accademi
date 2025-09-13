'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Eye, CreditCard } from "lucide-react";
import toast from 'react-hot-toast'
import Loader from "@/components/ui/Loader"

const Allnotes = () => {
    const { course_id, sem_id } = useParams() // get from route
    // const [user, setUser] = useState(null)
    const { notes, fetchNotes } = noteStore()
    const [filteredNotes, setFilteredNotes] = useState([]);


    // const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);


    const router = useRouter()




    useEffect(() => {
        setLoading(true)
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
        setLoading(false)
        // console.log("Notes:", notes);
        // console.log("Params:", course_id, sem_id);
        console.log("🔥 Filtered notes:", filtered);
    }, [notes, course_id, sem_id, fetchNotes]);


    // const openModal = (note) => {
    //     setSelectedNote(note);
    //     setShowModal(true);
    // };

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
    }, [])

    const handlePayment = async (noteId) => {
        if (!name || !email || !phone) {
            toast.error("Please fill in all the details");
            return;
        }

        const collectData = { noteId, name, email, phone };
        const res = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collectData)
        });
        const data = await res.json();

        if (!data.success) {
            toast.error("Payment initiation failed");
            return;
        }

        // Load Razorpay checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            order_id: data.orderId,
            name: "Urjja Academy",
            description: "Purchase Note",
            handler: async function (response) {
                // Payment successful, call backend to verify
                const verifyRes = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...response, noteId })
                });
                const verifyData = await verifyRes.json();






                if (verifyData.success) {
                    // Generate signed URL and redirect user
                    // window.location.href = `/api/downloadnotes?id=${noteId}`;
                    // ✅ Save user/payment info in cookie
                    // setCookie("user", JSON.stringify({ name, email, phone, paid: true }), { maxAge: 60 * 30 }); // 30 mins
                    // Store real DB user/payment info
                    setCookie("user", JSON.stringify({
                        _id: verifyData.userId,       // actual DB user ID
                        name,
                        email,
                        paidNotes: [noteId]           // store purchased note IDs
                    }), { maxAge: 60 * 30, path: "/" }); // 30 mins cookie
                    window.location.href = `/download/${noteId}`;
                } else {
                    toast.error("Payment verification failed");
                }
            },
            prefill: {
                name,
                email,
                contact: phone
            },
            theme: { color: "#b6985a" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };







    return (
        <>
            {loading && <Loader />}
            <div className="p-4  lg:p-10 min-h-0 text-gray-900 pt-10">
                <div className='pl-12'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => router.back()} >
                                    Semistars</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Notes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {filteredNotes.length === 0 ? (
                    <p>No notes found for this semester</p>
                ) : (

                    <div className="flex justify-center p-6 md:pt-9">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px]">
                            {filteredNotes.map((note) => (
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
                                            <span className="flex items-center gap-1 px-3 py-1 bg-green-800 text-green-100 font-semibold rounded-full text-xs">
                                                💰 ₹{note.price || 0}
                                            </span>
                                            <span className="flex items-center gap-1 px-3 py-1 text-purple-100 bg-purple-800 font-semibold rounded-full text-xs">
                                                🎓 Semester {note.semistar || 0}
                                            </span>
                                            <span className="flex items-center gap-1 px-3 py-1 text-blue-100 bg-blue-800 font-semibold rounded-full text-xs">
                                                📚 {note.course_title || "N/A"}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}

                                        <div className="flex gap-2 mt-2">
                                            {/* Buy Now Button */}
                                            {/* <Button
                                                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200"
                                                onClick={() => openModal(note)}
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                Buy Now
                                            </Button> */}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200">
                                                        <ShoppingCart className="w-5 h-5" /> Buy Now
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-lg">Enter Your Details</DialogTitle>
                                                        <DialogDescription>
                                                            Please fill out your details to proceed with payment.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="grid gap-4 py-2">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="name">Name</Label>
                                                            <Input
                                                                id="name"
                                                                placeholder="John Doe"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="grid gap-2">
                                                            <Label htmlFor="email">Email</Label>
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                placeholder="example@mail.com"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="grid gap-2">
                                                            <Label htmlFor="phone">Phone</Label>
                                                            <Input
                                                                id="phone"
                                                                placeholder="1234567890"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>

                                                        <Button
                                                            className="bg-black text-white hover:opacity-90"
                                                            onClick={() => handlePayment(note._id)}
                                                        >
                                                            <CreditCard className="w-5 h-5" />   Check Out
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            {/* Preview Button */}
                                            <Button
                                                className="flex-1 flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-lg border-2 border-purple-600 hover:bg-purple-50 hover:border-purple-700 transition-all duration-200"
                                            // onClick={() => previewNote(note)}
                                            >
                                                <Eye className="w-5 h-5" />
                                                Preview
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
            {/* {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handlePayment(selectedNote._id)}
                                className="px-4 py-2 bg-golden text-black rounded"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

        </>
    )
}

export default Allnotes
