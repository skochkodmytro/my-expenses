import * as Yup from 'yup';
import dayjs from 'dayjs';

import { dateTimeFormat } from '@/utils/date';

import { TransactionValues } from '../types';

const TransactionValidationSchema: Yup.ObjectSchema<TransactionValues> =
  Yup.object({
    title: Yup.string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title is too long')
      .required('Title is required'),
    categoryId: Yup.string().required('Category is required'),
    amount: Yup.string().required('Amount is required'),
    date: Yup.string()
      .test('is-valid-date', 'Invalid date format', (value) =>
        dayjs(value, dateTimeFormat, true).isValid()
      )
      .required('Date is required'),
  });

export default TransactionValidationSchema;
