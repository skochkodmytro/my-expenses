import { useEffect, useState } from 'react';
import { ModalProps, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CommonModal, DateTimePickerInput, TextInput } from '@/components';
import { useUserStore } from '@/features/auth';
import { useBoolean } from '@/hooks';
import { DEVICE_HEIGHT } from '@/constants/Device';
import { parseValidNumber } from '@/utils/text';
import { dateTimeFormat } from '@/utils/date';

import CategoriesList from './CategoriesList';
import CreateCategoryModal from './CreateCategoryModal';
import CategoryTypesSelector from './CategoryTypesSelector';

import { CategoryTypeEnum, Transaction, TransactionValues } from '../types';
import { TransactionSchema } from '../schemas';
import { useTodayTransactionStore } from '../store';

type ExpenseModalProps = Omit<ModalProps, 'children' | 'visible'> & {
  transaction: Partial<Transaction> | null;
  onClose: () => void;
};

const ExpenseModal = ({ transaction, ...rest }: ExpenseModalProps) => {
  const { user } = useUserStore();
  const { isCreating, isEditing, addTransaction, editTransaction } =
    useTodayTransactionStore();

  const { control, reset, handleSubmit, setValue } = useForm({
    resolver: yupResolver(TransactionSchema),
    defaultValues: {
      date: dayjs().format(dateTimeFormat),
    },
  });
  const [transactionType, setTransactionType] = useState(
    CategoryTypeEnum.Expense
  );

  const {
    value: isOpenCreateCategoryModal,
    setTrue: openCategoryModal,
    setFalse: closeCategoryModal,
  } = useBoolean(false);

  useEffect(() => {
    if (transaction) {
      setValue('title', transaction?.title || '');
      setValue(
        'amount',
        (transaction?.amount ? Math.abs(transaction?.amount) : '').toString()
      );
      setValue(
        'date',
        dayjs(
          transaction?.date ? transaction.date.toDate() : new Date()
        ).format(dateTimeFormat)
      );
      setValue('categoryId', transaction?.categoryId || '');
    }
  }, [transaction]);

  useEffect(() => {
    setValue('categoryId', '');
  }, [transactionType]);

  const processTransaction = ({
    date,
    amount,
    ...restData
  }: TransactionValues) => {
    const formattedDate = firestore.Timestamp.fromDate(
      dayjs(date, dateTimeFormat).toDate()
    );
    const formattedAmount =
      transactionType === CategoryTypeEnum.Expense
        ? -Number(amount)
        : Number(amount);

    if (transaction?.id) {
      editTransaction({
        ...restData,
        userId: transaction?.userId as string,
        id: transaction.id,
        date: formattedDate,
        amount: formattedAmount,
      }).then(() => {
        reset();
        rest.onClose();
      });

      return;
    }

    addTransaction({
      ...restData,
      date: formattedDate,
      userId: user?.uid as string,
      amount: formattedAmount,
    }).then(() => {
      reset();
      rest.onClose();
    });
  };

  const isLoading = isCreating || isEditing;

  return (
    <CommonModal visible={!!transaction} {...rest}>
      <Text variant="titleLarge" style={styles.title}>
        {transaction?.id ? 'Edit' : 'Create'} transaction
      </Text>

      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.formWrapper}>
          <CategoryTypesSelector
            type={transactionType}
            onChange={setTransactionType}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <CategoriesList
                  selectedIds={[value]}
                  type={transactionType}
                  onPressCategory={(id) => onChange(id)}
                  onPressAdd={openCategoryModal}
                />
                {error ? (
                  <HelperText type="error">{error.message}</HelperText>
                ) : null}
              </>
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value}
                label="Title"
                mode="outlined"
                placeholder="Short description"
                errorMessage={error?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                value={value || '0'}
                label="Amount"
                mode="outlined"
                keyboardType="number-pad"
                errorMessage={error?.message}
                onChangeText={(text) => onChange(parseValidNumber(text, value))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <DateTimePickerInput
                  label="Select date and time"
                  value={dayjs(value, dateTimeFormat).toDate()}
                  datePickerProps={{ maximumDate: dayjs().toDate() }}
                  onChange={(date) =>
                    onChange(dayjs(date).format(dateTimeFormat))
                  }
                />
                {error ? (
                  <HelperText type="error">{error.message}</HelperText>
                ) : null}
              </>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(processTransaction)}
        >
          {transaction?.id ? 'Edit' : 'Add'}
        </Button>
      </View>

      <CreateCategoryModal
        visible={isOpenCreateCategoryModal}
        onClose={closeCategoryModal}
      />
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    maxHeight: DEVICE_HEIGHT / 3,
  },
  title: {
    paddingBottom: 16,
  },
  formWrapper: {
    gap: 14,
  },
  buttonWrapper: {
    paddingVertical: 8,
  },
});

export default ExpenseModal;
