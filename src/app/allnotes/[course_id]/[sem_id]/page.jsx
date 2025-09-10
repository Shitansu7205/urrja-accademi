'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import noteStore from '@/store/noteStore'
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next";


const Allnotes = () => {
    const { course_id, sem_id } = useParams() // get from route
    // const [user, setUser] = useState(null)
    const { notes, fetchNotes } = noteStore()
    const [filteredNotes, setFilteredNotes] = useState([]);


    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const router = useRouter()



    const logOut = () => {
        localStorage.removeItem('token')
        alert('Logged out successfully')
    }


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


    const openModal = (note) => {
        setSelectedNote(note);
        setShowModal(true);
    };

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
    }, [])

    const handlePayment = async (noteId) => {
        if (!name || !email || !phone) {
            alert("Please fill all fields");
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
            alert("Payment initiation failed");
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
                    alert("Payment verification failed");
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
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Notes</h2>
                <button onClick={logOut}>Logout</button>

                {filteredNotes.length === 0 ? (
                    <p>No notes found for this semester</p>
                ) : (
                    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-red-400 ">
                    //     {filteredNotes.map(note => (
                    //         <Card key={note._id} className="shadow-md hover:shadow-lg transition rounded-2xl  pt-0">
                    //             {/* Image */}
                    //             {note.img_url && (
                    //                 <img
                    //                     src={note.img_url}
                    //                     alt={note.note_title}
                    //                     className="w-full h-40 object-cover rounded-t-2xl"
                    //                 />
                    //             )}

                    //             <CardHeader>
                    //                 <CardTitle className="text-lg font-semibold">{note.note_title}</CardTitle>
                    //             </CardHeader>

                    //             <CardContent>
                    //                 <p className="text-gray-600 text-sm">{note.desc}</p>
                    //                 <p className="font-bold text-purple-600 mt-2">₹ {note.price}</p>
                    //             </CardContent>

                    //             <CardFooter className="flex justify-between gap-2">
                    //                 <Button
                    //                     className="flex-1"
                    //                     onClick={() => paymentPageFunction(note._id)}
                    //                 >
                    //                     Buy Now
                    //                 </Button>
                    //                 {/* <button
                    //                     onClick={() => window.open(`/api/downloadnotes?id=${note._id}`, "_blank")}
                    //                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    //                 >
                    //                     Buy & Download
                    //                 </button> */}
                    //                 <Button className="flex-1" onClick={() => openModal(note)}>
                    //                     Buy Now
                    //                 </Button>



                    //             </CardFooter>
                    //         </Card>
                    //     ))}
                    // </div>



                    <div className="flex justify-center p-6">
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
                                            {/* <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-md transition"
                                            onClick={() => handleEditClick(note._id)}
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit
                                        </Button> */}

                                            <Button className="flex-1" onClick={() => openModal(note)}>
                                                Buy Now
                                            </Button>
                                            {/* <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">    Buy Now</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit profile</DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to your profile here. Click save when you&apos;re
                                                                done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">Name</Label>
                                                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" value={name}
                                                                    onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">Username</Label>
                                                                <Input id="email-1" name="username" defaultValue="@peduarte" value={email}
                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">Phone </Label>
                                                                <Input id="phone-1" name="username" defaultValue="@peduarte" value={email}
                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="submit">Save changes</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog> */}

                                            {/* <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-800 rounded-md transition"
                                                    >
                                                        Buy Now
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-purple-800">Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-gray-600">
                                                            This action cannot be undone. This will permanently delete the note.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-purple-800 text-white hover:bg-purple-900"
                                                            onClick={() => {
                                                                handleDelete(note._id)
                                                                toast.success("Note deleted successfully")
                                                            }}
                                                        >
                                                            Yes, Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>

                                            </AlertDialog> */}

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
            {showModal && (
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
            )}

            <button onClick={() => router.push('/notes')}>All Notes</button>
        </>
    )
}

export default Allnotes
