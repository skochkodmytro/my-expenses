import { create } from 'zustand';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { Transaction } from '../types';

const LIMIT = 20;

type Document =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

interface StatisticsState {
  transactions: Transaction[];
  isLoading: boolean;
  isFetchedAll: boolean;
  lastDocument: Document | null;
  fetch: (userId: string, startDate: Date, endDate: Date) => Promise<void>;
  fetchMore: (userId: string, startDate: Date, endDate: Date) => Promise<void>;
  reset: () => void;
}

const initialStore = {
  transactions: [],
  isLoading: false,
  isFetchedAll: false,
  lastDocument: null,
};

export const useStatisticsStore = create<StatisticsState>((set, get) => ({
  ...initialStore,

  fetch: async (userId, startDate, endDate) => {
    set({
      isLoading: true,
      isFetchedAll: false,
      lastDocument: null,
      transactions: [],
    });

    try {
      const query = firestore()
        .collection('transactions')
        .where('date', '>=', firestore.Timestamp.fromDate(startDate))
        .where('date', '<=', firestore.Timestamp.fromDate(endDate))
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .limit(LIMIT);

      const snapshot = await query.get();
      const transactions = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
      );
      const lastDocument = snapshot.docs[snapshot.docs.length - 1] || null;

      set({
        transactions,
        lastDocument,
        isFetchedAll: snapshot.docs.length < LIMIT,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMore: async (userId, startDate, endDate) => {
    const { lastDocument, isLoading, isFetchedAll, transactions } = get();
    if (isFetchedAll || !lastDocument || isLoading) {
      return;
    }

    set({ isLoading: true });

    try {
      const query = firestore()
        .collection('transactions')
        .orderBy('date', 'desc')
        .where('date', '>=', firestore.Timestamp.fromDate(startDate))
        .where('date', '<=', firestore.Timestamp.fromDate(endDate))
        .where('userId', '==', userId)
        .startAfter(lastDocument)
        .limit(LIMIT);

      const snapshot = await query.get();
      const newTransactions = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
      );
      const newLastDocument =
        snapshot.docs[snapshot.docs.length - 1] || lastDocument;

      set({
        transactions: [...transactions, ...newTransactions],
        lastDocument: newLastDocument,
        isFetchedAll: snapshot.docs.length < LIMIT,
      });
    } catch (error) {
      console.error('Error fetching more transactions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set(initialStore),
}));
