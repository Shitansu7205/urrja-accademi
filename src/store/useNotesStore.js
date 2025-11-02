import { create } from "zustand";

const useNotesStore = create((set, get) => ({
  notes: [],
  semesters: [],
  isNotesFetched: false,     // ✅ separate flag for notes
  isSemestersFetched: {},    // ✅ store fetched states per course_id

  fetchNotes: async () => {
    if (get().isNotesFetched) return;

    try {
      const res = await fetch("/api/noteget");
      const data = await res.json();

      set({
        notes: data.notes || [],
        isNotesFetched: true,
      });
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
    }
  },

  fetchSemesters: async (id) => {
    const { isSemestersFetched } = get();

    // ✅ prevent multiple calls for the same course_id
    if (isSemestersFetched[id]) return;

    try {
      const response = await fetch(`/api/semistar/${id}`);
      const data = await response.json();

      set((state) => ({
        semesters: data.semesters || [],
        isSemestersFetched: { ...state.isSemestersFetched, [id]: true },
      }));

      console.log("Semesters:", data.semesters);
    } catch (error) {
      console.error("❌ Error fetching semesters:", error);
    }
  },
}));

export default useNotesStore;
