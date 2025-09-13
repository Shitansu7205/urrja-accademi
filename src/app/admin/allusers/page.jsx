"use client";
import React, { useEffect } from "react";
import paymentStore from "@/store/paymentStore";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckCircle, XCircle, CreditCard, User, CalendarCheck, Mail, Phone } from "lucide-react"; // Icons for status
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";


const UsersList = () => {
    const { payments, fetchPayments, totalAmount } = paymentStore();

    useEffect(() => {
        if (!payments || payments.length === 0) {
            fetchPayments();
        }
    }, [payments, fetchPayments]);


    return (


        <div>
            <div className="bg-white rounded-sm shadow-md overflow-hidden">
                <Table className="min-w-full">
                    {/* Table Header */}
                    <TableHeader className="bg-purple-100 text-gray-700">
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {payments.map((p, index) => (
                            <HoverCard key={p._id}>
                                <HoverCardTrigger asChild>
                                    <TableRow className="hover:bg-purple-50 transition-colors duration-200 cursor-pointer">
                                        <TableCell className="font-sm">{p.orderId}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-600" /> {p.name}
                                        </TableCell>
                                        <TableCell className="truncate max-w-xs">{p.email}</TableCell>
                                        <TableCell>{p.phone}</TableCell>
                                        <TableCell>
                                            {p.status === "paid" ? (
                                                <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                                    Paid
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                                                    Pending
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">₹{p.amount}</TableCell>
                                    </TableRow>
                                </HoverCardTrigger>

                                <HoverCardContent className="w-80 p-5 bg-gradient-to-b from-white/90 to-purple-50 shadow-2xl rounded-xl border border-purple-200 backdrop-blur-sm">
                                    {/* Name & Status */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                            <User className="w-5 h-5 text-purple-600" /> {p.name}
                                        </h3>
                                        {p.status === "paid" ? (
                                            <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" /> Paid
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <XCircle className="w-4 h-4" /> Pending
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Email & Phone */}
                                    <p className="text-sm text-gray-700 truncate mb-1 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-purple-600" /> {p.email}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-purple-600" /> {p.phone}
                                    </p>

                                    {/* Payment Details */}
                                    <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                                        <div className="flex items-center gap-1">
                                            <CreditCard className="w-4 h-4 text-purple-600" /> ₹{p.amount}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarCheck className="w-4 h-4 text-purple-600" /> {new Date(p.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-2">
                                            <span className="font-medium">Payment ID:</span> {p.paymentId}
                                        </div>
                                        <div className="col-span-2">
                                            <span className="font-medium">Note ID:</span> {p.noteId}
                                        </div>
                                    </div>
                                </HoverCardContent>

                            </HoverCard>
                        ))}

                        {/* Total Revenue */}
                        <TableRow className="bg-purple-50 font-semibold text-gray-800">
                            <TableCell colSpan={5} className="text-right">
                                Total Revenue
                            </TableCell>
                            <TableCell className="text-right">₹{totalAmount}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>


    );
};

export default UsersList;
