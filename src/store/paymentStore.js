import { create } from "zustand";

const paymentStore = create((set, get) => ({
    payments: [],
    totalAmount: 0,
    fetchPayments: async () => {
        try {
            const response = await fetch('/api/get-payment-status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            set({ payments: data.payments, totalAmount: data.totalAmount || [] });
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    }
}));

export default paymentStore;