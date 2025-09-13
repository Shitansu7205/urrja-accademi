"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";


export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) router.push("/admin/panel");
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Login failed");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Login successful");
            router.push("/admin/dashboard");
        } catch (err) {
            console.error(err);
            toast.error("Server error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="p-26 flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left Section */}
                <div className="hidden md:flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-12 relative">
                    <h2 className="text-4xl font-bold mb-4">Welcome back!</h2>
                    <p className="text-lg opacity-90 text-center">
                        You can sign in to access your existing account.
                    </p>

                    {/* Decorative abstract shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 -top-10 -left-10"></div>
                        <div className="absolute w-72 h-72 bg-purple-400 rounded-full opacity-20 -bottom-16 -right-16"></div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="space-y-2">
                            <Label htmlFor="email">Username or Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="cursor-pointer">Remember me</Label>
                            </div>
                            <a href="#" className="text-purple-600 hover:underline">Forgot password?</a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-all"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        New here?{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
