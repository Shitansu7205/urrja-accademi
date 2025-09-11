"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
// import Router from "next/navigation";
import { useRouter } from "next/navigation";


const Header = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()

    const navLinks = [
        { name: "Home", href: "https://urrja-static-site.vercel.app/" },
        { name: "About Us", href: "https://urrja-static-site.vercel.app/about.html" },
        { name: "Certification", href: "/certification" },
        { name: "Admission", href: "/" },
        { name: "Notes", href: "/" },
        { name: "Contact Us", href: "https://urrja-static-site.vercel.app/contact.html" },
    ];

    useEffect(() => {
        const toekn = localStorage.getItem('token')
        if (toekn) {
            setIsLoggedIn(true)
        }
    }, [])


    return (
        <header className="w-full shadow-md sticky top-0 z-50">
            {/* 🔹 Top bar */}
            {/* <div className="bg-red-900 text-white text-xs md:text-sm flex md:justify-between  px-40 py-1">
                <span>📞 HELP DESK : +91 8328888962</span>
                <span>📍 Ram Nagar, Brahmapur, Odisha, 760005</span>
            </div> */}

            {/* 🔹 Main Navbar */}
            <div className="flex items-center justify-around px-4 md:px-8 py-3 bg-white">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src="https://urrja-static-site.vercel.app/assets/img/logo/logo.svg" // replace with your logo path
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-red-700 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Admin Login Button */}
                <div className="hidden md:flex">
                    {isLoggedIn ? (
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/admin/panel")}>
                            <LogIn size={18} /> Admin Panel
                        </Button>
                    ) : (<Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/admin/login")}>
                        <LogIn size={18} />
                        Admin Login
                    </Button>)}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 🔹 Mobile Nav */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-lg flex flex-col px-6 py-4 space-y-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="text-gray-700 font-medium hover:text-red-700 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Admin Login */}
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => router.push("/admin/login")}
                        >
                            <LogIn size={18} />
                            Admin Login
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
