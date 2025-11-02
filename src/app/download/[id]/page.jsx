// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function DownloadPage({ params }) {
//     const { id } = useParams();
//     const [signedUrl, setSignedUrl] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [expiresAt, setExpiresAt] = useState(null);
//     const [remainingTime, setRemainingTime] = useState(null);

//     useEffect(() => {
//         async function fetchSignedUrl() {
//             try {
//                 const res = await fetch(`/api/downloadnotes?id=${id}`, { method: "GET" });
//                 if (!res.ok) throw new Error("Failed to get signed URL");
//                 const data = await res.json();
//                 console.log("The data is :", data)
//                 setSignedUrl(data.signedUrl); // ✅ update backend to return JSON
//                 setExpiresAt(data.expiresAt * 1000); // convert to ms

//             } catch (err) {
//                 console.error(err);
//                 alert("Unable to fetch download link");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchSignedUrl();
//     }, [id]);



//     // countdown
//     useEffect(() => {
//         if (!expiresAt) return;

//         const interval = setInterval(() => {
//             const now = Date.now();
//             const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));
//             setRemainingTime(diff);
//             if (diff === 0) clearInterval(interval);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [expiresAt]);







//     if (loading) return <p>Loading download link...</p>;

//     if (!signedUrl) return <p>❌ No download link available</p>;

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-xl font-bold mb-4">Download Your Note</h1>

//             {remainingTime > 0 ? (
//                 <>
//                     <a
//                         href={signedUrl}
//                         download
//                         className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
//                     >
//                         📥 Download Now
//                     </a>
//                     <p className="mt-2 text-sm text-gray-500">
//                         Link expires in {remainingTime} seconds
//                     </p>
//                 </>
//             ) : (
//                 <p className="text-red-500 font-semibold">
//                     ❌ Link expired. Please request again.
//                 </p>
//             )}
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { Download, XCircle, Clock } from 'lucide-react';
export default function DownloadPage() {
    const { id } = useParams();
    const [signedUrl, setSignedUrl] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(true);
    // const [status, setStatus] = useState("Checking payment...");

    useEffect(() => {
        async function fetchDownloadLink() {
            try {
                // const userCookie = getCookie("user");
                // if (!userCookie) {
                //     setStatus("❌ Please log in or purchase to download");
                //     setLoading(false);
                //     return;
                // }

                // const user = JSON.parse(userCookie);

                // Fetch signed URL
                const res = await fetch(`/api/downloadnotes?id=${id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                setSignedUrl(data.signedUrl);
                setExpiresAt(data.expiresAtDate);
                // console.log("The data is :", data.expiresAtDate)

            //    console.log(res)


                // if (res.status === 401) setStatus("⚠️ Please log in to download");
                // else if (res.status === 403) setStatus("❌ You have not purchased this note");
                // else if (!res.ok) throw new Error("Failed to fetch download link");
                // else {
                //     const data = await res.json();
                //     setSignedUrl(data.signedUrl);
                //     setExpiresAt(new Date(data.expiresAtDate));
                //     setStatus(null);
                // }
            } catch (err) {
                console.error(err);
                setStatus("❌ Unable to fetch download link");
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchDownloadLink();
    }, [id]);

    // Countdown
    // useEffect(() => {
    //     if (!expiresAt) return;
    //     const interval = setInterval(() => {
    //         const diff = Math.max(0, Math.floor((expiresAt - new Date()) / 1000));
    //         setCountdown(diff);
    //         if (diff <= 0) clearInterval(interval);
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [expiresAt]);


    if (loading) return <p className="text-center mt-10">Loading...</p>;
    // if (status) return <p className="text-center mt-10 text-red-500">{status}</p>;

    return (
        // <div className="flex flex-col items-center justify-center h-screen px-4">
        //     <h1 className="text-2xl font-bold mb-4">Download Your Note</h1>
        //     {countdown > 0 ? (
        //         <>
        //             <a
        //                 href={signedUrl}
        //                 download
        //                 className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        //             >
        //                 📥 Download Now
        //             </a>
        //             <p className="mt-2 text-sm text-gray-500">
        //                 Link will expire in {countdown} seconds
        //             </p>
        //         </>
        //     ) : (
        //         <p className="text-red-500 font-semibold mt-2">
        //             ❌ Link expired. Please purchase again.
        //         </p>
        //     )}
        // </div>
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-12 bg-gradient-to-tr from-purple-50 via-purple-100 to-purple-200">

            <>
                {/* Left Section: Text */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold  leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 animate-text">
                        Download Folders Effortlessly
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl max-w-xl">
                        Download all your folders and files in just one click. Stay organized and manage your content efficiently.
                    </p>
                    <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-purple-200 px-5 py-4 rounded-2xl shadow-lg">
                        {/* Download Button */}
                        <a
                            href={signedUrl}
                            download
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                            Download Now
                        </a>

                        {/* Countdown Info */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                            <Clock className="w-4 h-4 text-red-500" />
                            <p>Link will expire in <span className="font-semibold text-red-700">30</span> seconds</p>
                        </div>
                    </div>
                </div>
                {/* Right Section: Illustration */}
                <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative">
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                        {/* Glassmorphism Background Layers */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-56 h-56 md:w-64 md:h-64 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl transform rotate-6 md:rotate-12 transition duration-500 hover:scale-105 hover:shadow-3xl"></div>
                            <div className="absolute top-0 left-6 w-56 h-56 md:w-64 md:h-64 bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl transform -rotate-6 md:-rotate-12 transition duration-500 hover:scale-110 hover:shadow-2xl"></div>
                        </div>



                        {/* Option 2: Use Lucide SVG folder */}
                        {/* <Folder className="relative z-10 w-32 h-32 text-yellow-500 animate-float hover:animate-bounce" /> */}

                        {/* Floating Random Icons / Shapes */}
                        <div className="absolute -top-4 -left-6 w-5 h-5 bg-purple-400 rounded-full animate-ping opacity-70"></div>
                        <div className="absolute top-8 right-6 w-6 h-4 bg-yellow-400 rounded-sm rotate-12 animate-bounce opacity-80"></div>
                        <div className="absolute bottom-10 left-10 w-4 h-5 bg-blue-400 rounded-md rotate-6 animate-pulse opacity-80"></div>
                        <div className="absolute top-20 left-32 w-3 h-3 bg-pink-400 rotate-45 opacity-80 animate-ping"></div>
                        <div className="absolute bottom-6 right-20 w-4 h-4 bg-green-400 opacity-70 animate-bounce"></div>
                    </div>
                </div>
            </>

            {/* <div className="flex items-center justify-between w-full max-w-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl shadow-md">
               
                    <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <p className="font-semibold">❌ Link expired. Please purchase again.</p>
                    </div>

                 
                    <a
                        href="/"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition transform hover:scale-105"
                    >
                        Go Back
                    </a>
                </div> */}

        </div>


    );
}
