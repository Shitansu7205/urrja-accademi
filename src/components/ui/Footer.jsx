'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-1.5 w-full m-0">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly gap-4">

                {/* Copyright */}
                <div className="text-sm text-gray-300">
                    &copy; <span className="text-orange-500 font-semibold">2025 Urrja Academy</span>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" target="_blank" aria-label="Facebook">
                            <FaFacebookF className="w-5 h-5 text-white" />
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" target="_blank" aria-label="Instagram">
                            <FaInstagram className="w-5 h-5 text-white" />
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" target="_blank" aria-label="Twitter">
                            <FaTwitter className="w-5 h-5 text-white" />
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" target="_blank" aria-label="LinkedIn">
                            <FaLinkedinIn className="w-5 h-5 text-white" />
                        </a>
                    </Button>
                </div>


                {/* Powered By */}
                <div className="text-sm text-gray-400">
                    Powered by <span className="text-orange-500 font-semibold">Trip Star</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
