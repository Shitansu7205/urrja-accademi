import { create } from "zustand";

const noteStore = create((set, get) => ({
    notes: [],

    // Fetch note
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
    },

    // Delete note
    deleteNote: async (id) => {
        try {
            const res = await fetch(`/api/deletenote/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Remove note from store immediately
                set((state) => ({
                    notes: state.notes.filter((note) => note._id !== id)
                }));
                console.log(`✅ Note ${id} deleted and store updated`);
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    },

    // Edit note
    editNote: async (id, updatedData) => {

        console.log("Editing note:", id, updatedData);
        try {
            const res = await fetch(`/api/editnote/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                const updatedNote = await res.json();
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note._id === id ? updatedNote : note
                    ),
                }));
            } else {
                console.error("Failed to update note");
            }
        } catch (err) {
            console.error("Error editing note:", err);
        }
    },

}));

export default noteStore