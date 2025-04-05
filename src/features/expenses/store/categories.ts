import { create } from 'zustand';
import firestore, { Filter } from '@react-native-firebase/firestore';

import { Category } from '../types';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  isAddingCategory: boolean;
  isFetched: boolean;
  error: string | null;
  fetchCategories: (userId: string | null) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  reset: () => void;
}

const initialStore = {
  categories: [],
  isLoading: false,
  isAddingCategory: false,
  isFetched: false,
  error: null,
};

export const useCategoryStore = create<CategoryState>((set) => ({
  ...initialStore,

  fetchCategories: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      let query = firestore()
        .collection('categories')
        .where(
          Filter.or(
            Filter('userId', '==', null),
            Filter('userId', '==', userId)
          )
        );

      const snapshot = await query.get();
      const categories = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Category)
      );

      set({ categories, isLoading: false, isFetched: true });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isAddingCategory: true, error: null });

    try {
      const docRef = await firestore().collection('categories').add(category);
      const newCategory = { id: docRef.id, ...category };

      set((state) => ({
        categories: [...state.categories, newCategory],
        isAddingCategory: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isAddingCategory: false });
    }
  },

  reset: () => set(initialStore),
}));
