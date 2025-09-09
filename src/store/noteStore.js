import { create } from "zustand";

const noteStore = create((set, get) => ({
    notes: [],
    fetchNotes: async () => {
        if (get().notes.length > 0) {
            console.log("✅ Notes already in store — skipping API call");
            return;
        }

        try {
            const response = await fetch('/api/noteget', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            set({ notes: data.notes || [] });
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }
}));

export default noteStore