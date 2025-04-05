import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Category = {
  id: string;
  name: string;
  userId: string | null;
  icon: string; // name icon from MaterialCommunityIcons
  type: CategoryTypeEnum;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export enum CategoryTypeEnum {
  Expense,
  Income,
}

export type CreateCategory = {
  name: string;
  type: CategoryTypeEnum;
  icon: string;
};

export type Transaction = {
  id: string;
  title: string;
  categoryId: string;
  userId: string;
  category?: Category;
  amount: number;
  date: FirebaseFirestoreTypes.Timestamp;
};

export type TransactionValues = {
  title: string;
  categoryId: string;
  amount: string;
  date: string;
};
