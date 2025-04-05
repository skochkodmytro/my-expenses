import { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { useBoolean } from '@/hooks';

import { useUserStore } from '../store';

const useListenUserUpdate = () => {
  const { value: isInitializing, setFalse: finishInitializing } =
    useBoolean(true);
  const { user, setUser } = useUserStore();

  function onAuthStateChanged(fetchedUser: FirebaseAuthTypes.User | null) {
    setUser(fetchedUser);

    if (isInitializing) {
      finishInitializing();
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return { isInitializing, user };
};

export default useListenUserUpdate;
