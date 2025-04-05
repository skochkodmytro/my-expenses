import auth from '@react-native-firebase/auth';

import { useAppNavigation } from '@/hooks';
import { AuthStackParamList } from '@/screens/AuthStack';
import { RootStackParamList } from '@/screens';

import { AuthForm } from '../components';
import { AuthValues } from '../types';

const SignUpView = () => {
  const navigation = useAppNavigation<
    AuthStackParamList & RootStackParamList
  >();

  const handleSignUp = async (data: AuthValues) => {
    return auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabs' }],
        });
      });
  };

  return (
    <AuthForm
      title="Sign Up"
      buttonTitle="Sign Up"
      navigateButtonTitle="Go sign in"
      onSubmit={handleSignUp}
      onNavigate={navigation.goBack}
    />
  );
};

export default SignUpView;
