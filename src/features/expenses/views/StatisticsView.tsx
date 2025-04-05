import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { BackgroundView } from '@/components';
import { useTheme } from '@/hooks';
import { useUserStore } from '@/features/auth';

import { useStatisticsStore } from '../store';
import { TransactionsList } from '../components';
import { useTransactionsWithCategories } from '../hooks';

const StatisticsView = () => {
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const {
    transactions,
    isLoading,
    fetch: fetchTransactions,
    fetchMore: fetchMoreTransactions,
  } = useStatisticsStore();

  const {
    transactions: transactionsWithCategories,
    isLoading: isTransactionsLoading,
  } = useTransactionsWithCategories(transactions, isLoading);

  useEffect(() => {
    handleFetchMore();
  }, [currentMonth, fetch]);

  const handleFetchMore = (isInitial: boolean = true) => {
    const startDate = currentMonth.toDate();
    const endDate = currentMonth.endOf('month').toDate();

    if (isInitial) {
      fetchTransactions(user?.uid as string, startDate, endDate);
    } else {
      fetchMoreTransactions(user?.uid as string, startDate, endDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    const nextMonth = currentMonth.add(1, 'month');
    if (nextMonth.isAfter(dayjs(), 'month')) {
      return;
    }
    setCurrentMonth(nextMonth);
  };

  return (
    <BackgroundView style={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} disabled={isLoading}>
          <AntDesign name="left" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text variant="titleLarge" style={styles.dateText}>
          {currentMonth.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity
          onPress={handleNextMonth}
          disabled={isLoading || currentMonth.isSame(dayjs(), 'month')}
        >
          <AntDesign
            name="right"
            size={24}
            color={
              currentMonth.isSame(dayjs(), 'month')
                ? theme.colors.backdrop
                : theme.colors.onSurface
            }
          />
        </TouchableOpacity>
      </View>

      <TransactionsList
        data={transactionsWithCategories}
        isLoading={isTransactionsLoading}
        emptyText="No transactions"
        onEndReachedThreshold={0.5}
        onEndReached={() => handleFetchMore(false)}
      />
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  dateText: {
    marginHorizontal: 16,
  },
});

export default StatisticsView;
