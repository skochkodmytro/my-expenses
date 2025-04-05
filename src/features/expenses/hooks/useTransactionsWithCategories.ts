import { useMemo } from 'react';

import useCategories from './useCategories';
import { Transaction } from '../types';

const useTransactionsWithCategories = (
  transactions: Transaction[],
  isLoading: boolean
) => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();

  const transactionsWithCategories = useMemo(() => {
    if (isCategoriesLoading) {
      return [];
    }

    return transactions.map((transaction) => ({
      ...transaction,
      category: categories.find((c) => c.id === transaction.categoryId),
    }));
  }, [isLoading, isCategoriesLoading, transactions, categories]);

  return {
    transactions: transactionsWithCategories,
    isLoading: isLoading || isCategoriesLoading,
  };
};

export default useTransactionsWithCategories;
