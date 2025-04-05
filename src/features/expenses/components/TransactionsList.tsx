import { useCallback } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useTheme } from '@/hooks';

import { Transaction } from '../types';

type TransactionsListProps = Omit<FlatListProps<Transaction>, 'renderItem'> & {
  isLoading?: boolean;
  deleteTransactionId?: string | null;
  emptyText?: string;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
};

const TransactionsList = ({
  isLoading = false,
  data,
  deleteTransactionId,
  emptyText = 'No transactions today',
  onDelete,
  onEdit,
  ...rest
}: TransactionsListProps) => {
  const { theme } = useTheme();

  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item }) => {
      const isDeleting = deleteTransactionId === item.id;

      return (
        <View style={styles.transaction}>
          <View
            style={[
              styles.transactionCategory,
              {
                backgroundColor:
                  item.amount < 0 ? theme.colors.error : theme.colors.primary,
              },
            ]}
          >
            {item.category ? (
              <MaterialCommunityIcons
                name={item.category?.icon}
                size={22}
                color="white"
              />
            ) : null}
          </View>

          <View style={styles.transactionInfo}>
            <Text variant="titleSmall">{item.amount}</Text>
            <Text variant="labelSmall">{item.category?.name}</Text>
          </View>

          <Text style={styles.description}>{item.title}</Text>

          <View style={styles.transactionActions}>
            {onEdit ? (
              <TouchableOpacity
                style={styles.actionItem}
                hitSlop={8}
                onPress={() => onEdit(item)}
              >
                <AntDesign
                  name="edit"
                  size={18}
                  color={theme.colors.onSurface}
                />
              </TouchableOpacity>
            ) : null}
            {onDelete ? (
              <TouchableOpacity
                style={styles.actionItem}
                hitSlop={8}
                disabled={isDeleting}
                onPress={() => onDelete(item)}
              >
                {isDeleting ? (
                  <ActivityIndicator size={14} />
                ) : (
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color={theme.colors.onSurface}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      );
    },
    [deleteTransactionId, theme, onEdit, onDelete]
  );

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size="small" />;
    }

    return null;
  }, [isLoading]);

  const renderEmpty = useCallback(() => {
    if (!isLoading) {
      return (
        <Text variant="titleMedium" style={styles.emptyText}>
          {emptyText}
        </Text>
      );
    }

    return null;
  }, [isLoading]);

  const renderSeparator = useCallback(() => <Divider />, []);

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    paddingVertical: 12,
  },
  transaction: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionCategory: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    width: 50,
  },
  transactionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    flex: 1,
  },
  actionItem: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionsList;
