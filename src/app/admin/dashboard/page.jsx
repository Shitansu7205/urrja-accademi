
"use client";

import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    StickyNote,
    PlusCircle,
    FileText, Users, DollarSign, Heart, ClipboardList, CreditCard
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Panel from "../panel/page";
import UploadNote from '@/app/admin/post-note/page'
import Link from "next/link";
import UsersList from '@/app/admin/allusers/page'
const menuItems = [
    { id: "home", label: "Home", icon: LayoutDashboard },
    { id: "post", label: "Post Note", icon: PlusCircle },
    { id: "notes", label: "My Notes", icon: StickyNote },
    { id: "users", label: "All Transactions", icon: CreditCard },
];
import paymentStore from "@/store/paymentStore";

export default function Dashboard() {
    const [active, setActive] = useState("home");
    const { payments, fetchPayments, totalAmount } = paymentStore();
    // const addNote = () => {
    //     if (!newNote.title || !newNote.content) return;
    //     setNotes([...notes, { id: Date.now(), ...newNote }]);
    //     setNewNote({ title: "", content: "" });
    //     setActive("notes"); // redirect to My Notes
    // };

    useEffect(() => {
        if (!payments || payments.length === 0) {
            fetchPayments();
        }
    }, [payments, fetchPayments]);

    return (
        <div className="flex h-screen ">
            {/* Sidebar */}
            <aside className="fixed top-0 pt-18 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col">
                <div className="px-6 py-4 text-xl font-bold border-b bg-purple-600 text-white">
                    Admin Panel
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition mb-5 ${active === item.id
                                    ? "bg-purple-600 text-white shadow"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon className="h-5 w-5 mr-2" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>



            {/* Main */}
            <main className="flex-1 flex flex-col ml-64">


                {/* Sections */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {active === "home" && (

                        <div>
                            {/* Dashboard Top Bar */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3">

                                {/* Notes */}

                                <Link href="/notes">
                                    <Card className="bg-pink-100 border-none hover:bg-pink-200 transition duration-200">
                                        <CardHeader className="flex items-center gap-1 pb-1">
                                            <FileText className="w-4 h-4 text-pink-700" />
                                            <CardTitle className="text-sm text-pink-700">Notes</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl font-semibold text-pink-900">
                                            123
                                        </CardContent>
                                    </Card>
                                </Link>
                                {/* Users */}
                                <Card className="bg-blue-100 border-none hover:bg-blue-200 transition duration-200">
                                    <CardHeader className="flex items-center gap-1 pb-1">
                                        <Users className="w-4 h-4 text-blue-700" />
                                        <CardTitle className="text-sm text-blue-700">Users</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xl font-semibold text-blue-900">56</CardContent>
                                </Card>

                                {/* Total Income */}
                                <Card className="bg-green-100 border-none hover:bg-green-200 transition duration-200">
                                    <CardHeader className="flex items-center gap-1 pb-1">
                                        <DollarSign className="w-4 h-4 text-green-700" />
                                        <CardTitle className="text-sm text-green-700">Total Income</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xl font-semibold text-green-900">{totalAmount}</CardContent>
                                </Card>

                                {/* Form Submissions */}
                                <Card className="bg-yellow-100 border-none hover:bg-yellow-200 transition duration-200">
                                    <CardHeader className="flex items-center gap-1 pb-1">
                                        <ClipboardList className="w-4 h-4 text-yellow-700" />
                                        <CardTitle className="text-sm text-yellow-700">Form Submissions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xl font-semibold text-yellow-900">78</CardContent>
                                </Card>

                            </div>
                            <Panel />
                        </div>
                    )}

                    {active === "post" && (
                        <UploadNote />
                    )}

                    {active === "notes" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">My Notes</h2>
                            <Panel />
                        </div>
                    )}
                    {active === "users" && (
                        <div className="space-y-4">
                            <UsersList />
                        </div>
                    )}
                </div>
            </main >
        </div >
    );
}
