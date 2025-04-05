import { useEffect } from 'react';
import { useUserStore } from '@/features/auth';

import { useCategoryStore } from '../store';

const useCategories = () => {
  const { user } = useUserStore();
  const {
    categories,
    isFetched,
    isLoading,
    isAddingCategory: isAddingCategoryLoading,
    fetchCategories,
    addCategory,
  } = useCategoryStore();

  useEffect(() => {
    if (!isFetched) {
      fetchCategories(user?.uid || null);
    }
  }, []);

  return { categories, isLoading, isAddingCategoryLoading, addCategory };
};

export default useCategories;
