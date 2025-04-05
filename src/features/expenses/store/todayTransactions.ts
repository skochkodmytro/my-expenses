import { create } from 'zustand';
import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';

import { Transaction } from '../types';
import { isSameDate } from '@/utils/date';

const transactionsCollection = firestore().collection('transactions');

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  isFetched: boolean;
  isCreating: boolean;
  isEditing: boolean;
  deleteTransactionId: string | null;
  fetchTodayTransactions: (userId: string) => Promise<void>;
  addTransaction: (newTransaction: Omit<Transaction, 'id'>) => Promise<void>;
  editTransaction: (newTransaction: Transaction) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
  reset: () => void;
}

const initialStore = {
  transactions: [],
  isLoading: false,
  isCreating: false,
  isFetched: false,
  isEditing: false,
  deleteTransactionId: null,
};

export const useTodayTransactionStore = create<TransactionStore>((set) => ({
  ...initialStore,

  fetchTodayTransactions: async (userId) => {
    set({ isLoading: true });
    try {
      const today = dayjs().startOf('day').toDate();
      const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

      const snapshot = await transactionsCollection
        .orderBy('date', 'desc')
        .where('date', '>=', firestore.Timestamp.fromDate(today))
        .where('date', '<=', firestore.Timestamp.fromDate(tomorrow))
        .where('userId', '==', userId)
        .get();

      const transactions = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Transaction)
      );

      set({ transactions, isFetched: true });
    } catch (error) {
      console.error(error, '----error fetch today transactions');
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ isCreating: true });

    try {
      const docRef = await transactionsCollection.add(transaction);
      const newTransaction = { id: docRef.id, ...transaction };

      if (isSameDate(dayjs().toDate(), newTransaction.date.toDate())) {
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      }

      set(() => ({
        isCreating: false,
      }));
    } catch (error) {
      set({ isCreating: false });
    }
  },

  editTransaction: async (transaction) => {
    set({ isEditing: true });

    try {
      await transactionsCollection.doc(transaction.id).update(transaction);

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transaction.id ? { ...t, ...transaction } : t
        ),
        isEditing: false,
      }));
    } catch (error) {
      set({ isEditing: false });
    }
  },

  deleteTransaction: async (transactionId) => {
    set({ deleteTransactionId: transactionId });
    try {
      await transactionsCollection.doc(transactionId).delete();
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== transactionId),
      }));
    } catch (error) {
      console.error(error, '----error deleting transaction');
    } finally {
      set({ deleteTransactionId: null });
    }
  },

  reset: () => set(initialStore),
}));
