import auth from '@react-native-firebase/auth';

import { useAppNavigation } from '@/hooks';
import { AuthStackParamList } from '@/screens/AuthStack';
import { RootStackParamList } from '@/screens';

import { AuthForm } from '../components';
import { AuthValues } from '../types';

const SignInView = () => {
  const navigation = useAppNavigation<
    AuthStackParamList & RootStackParamList
  >();

  const handleSignIn = async (data: AuthValues) => {
    return auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabs' }],
        });
      });
  };

  return (
    <AuthForm
      title="Sign In"
      buttonTitle="Sign In"
      navigateButtonTitle="Go sign up"
      onSubmit={handleSignIn}
      onNavigate={() => navigation.navigate('SignUp')}
    />
  );
};

export default SignInView;
