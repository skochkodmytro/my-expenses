import { useEffect } from 'react';
import { Alert } from 'react-native';

import { useTodayTransactionStore } from '../store';
import { Transaction } from '../types';

import useTransactionsWithCategories from './useTransactionsWithCategories';

const useTodayTransactions = () => {
  const {
    transactions,
    isLoading: isFetchTransactionsLoading,
    isFetched: isFetchedTransactions,
    deleteTransactionId,
    fetchTodayTransactions,
    deleteTransaction,
  } = useTodayTransactionStore();

  useEffect(() => {
    if (!isFetchedTransactions) {
      fetchTodayTransactions();
    }
  }, []);

  const handleDeleteTransaction = (transaction: Transaction) => {
    Alert.alert(
      'Delete transaction?',
      undefined,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(transaction.id),
        },
      ],
      { cancelable: true }
    );
  };

  const { transactions: transactionsWithCategories, isLoading } =
    useTransactionsWithCategories(transactions, isFetchTransactionsLoading);

  return {
    transactions: transactionsWithCategories,
    isLoading,
    deleteTransactionId,
    deleteTransaction: handleDeleteTransaction,
  };
};

export default useTodayTransactions;
