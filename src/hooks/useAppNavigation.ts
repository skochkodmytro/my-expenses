import { NavigationProp, useNavigation } from '@react-navigation/native';

const useAppNavigation = <T extends {}>() => {
  const navigation: NavigationProp<T> = useNavigation();

  return navigation;
};

export default useAppNavigation;
