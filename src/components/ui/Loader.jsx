// components/FullScreenLoader.js
import { LoaderIcon } from "lucide-react";

export default function FullScreenLoader() {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <LoaderIcon className="h-8 w-8 animate-spin text-white/80" />
        </div>

    );
}