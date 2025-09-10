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

export default function DownloadPage() {
    const { id } = useParams();
    const [signedUrl, setSignedUrl] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("Checking payment...");

    useEffect(() => {
        async function fetchDownloadLink() {
            try {
                const userCookie = getCookie("user");
                if (!userCookie) {
                    setStatus("❌ Please log in or purchase to download");
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(userCookie);

                // Fetch signed URL
                const res = await fetch(`/api/downloadnotes?id=${id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.status === 401) setStatus("⚠️ Please log in to download");
                else if (res.status === 403) setStatus("❌ You have not purchased this note");
                else if (!res.ok) throw new Error("Failed to fetch download link");
                else {
                    const data = await res.json();
                    setSignedUrl(data.signedUrl);
                    setExpiresAt(new Date(data.expiresAtDate));
                    setStatus(null);
                }
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
    useEffect(() => {
        if (!expiresAt) return;
        const interval = setInterval(() => {
            const diff = Math.max(0, Math.floor((expiresAt - new Date()) / 1000));
            setCountdown(diff);
            if (diff <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (status) return <p className="text-center mt-10 text-red-500">{status}</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <h1 className="text-2xl font-bold mb-4">Download Your Note</h1>
            {countdown > 0 ? (
                <>
                    <a
                        href={signedUrl}
                        download
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                    >
                        📥 Download Now
                    </a>
                    <p className="mt-2 text-sm text-gray-500">
                        Link will expire in {countdown} seconds
                    </p>
                </>
            ) : (
                <p className="text-red-500 font-semibold mt-2">
                    ❌ Link expired. Please purchase again.
                </p>
            )}
        </div>
    );
}
