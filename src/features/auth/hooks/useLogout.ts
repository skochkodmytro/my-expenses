import auth from '@react-native-firebase/auth';

import {
  useStatisticsStore,
  useCategoryStore,
  useTodayTransactionStore,
} from '@/features/expenses';

import { useUserStore } from '../store';

const useLogout = () => {
  const { reset: resetUserStore } = useUserStore();
  const { reset: resetStatisticsStore } = useStatisticsStore();
  const { reset: resetCategoryStore } = useCategoryStore();
  const { reset: resetTodayTransactionStore } = useTodayTransactionStore();

  return () => {
    // clear store, storage etc here if need
    resetUserStore();
    resetCategoryStore();
    resetStatisticsStore();
    resetTodayTransactionStore();

    auth().signOut();
  };
};

export default useLogout;
