import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { BackgroundView } from '@/components';
import { formatDate } from '@/utils/date';
import { useTheme } from '@/hooks';

import { ExpenseModal, TransactionsList } from '../components';
import { useTodayTransactions } from '../hooks';

import { Transaction } from '../types';

const DashboardView = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    transactions,
    isLoading: isFetchedTransactions,
    deleteTransactionId,
    deleteTransaction,
  } = useTodayTransactions();

  const [transactionToProcess, setTransactionToProcess] =
    useState<Partial<Transaction> | null>(null);

  return (
    <BackgroundView style={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {formatDate(dayjs())}
        </Text>

        <TouchableOpacity
          hitSlop={12}
          onPress={() => setTransactionToProcess({})}
        >
          <AntDesign
            name="pluscircleo"
            size={22}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
      </View>

      <TransactionsList
        isLoading={isFetchedTransactions}
        data={transactions}
        deleteTransactionId={deleteTransactionId}
        onDelete={deleteTransaction}
        onEdit={(transaction) => setTransactionToProcess(transaction)}
      />

      <ExpenseModal
        transaction={transactionToProcess}
        onClose={() => setTransactionToProcess(null)}
      />
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    flex: 1,
  },
});

export default DashboardView;
