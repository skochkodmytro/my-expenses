import { KeyboardAvoidingView, View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme, useKeyboard, useBoolean } from '@/hooks';
import { BackgroundView, TextInput } from '@/components';

import { AuthValues } from '../types';
import { AuthValidationSchema } from '../schemas';

interface AuthFormProps {
  title: string;
  buttonTitle: string;
  navigateButtonTitle: string;
  onSubmit: (data: AuthValues) => Promise<unknown>;
  onNavigate: () => void;
}

const AuthForm = ({
  title,
  buttonTitle,
  navigateButtonTitle,
  onSubmit,
  onNavigate,
}: AuthFormProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { isKeyboardVisible } = useKeyboard();

  const { control, handleSubmit } = useForm<AuthValues>({
    resolver: yupResolver(AuthValidationSchema),
  });

  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  const handleFormSubmit = async (data: AuthValues) => {
    startLoading();
    try {
      await onSubmit(data);
    } catch (err: any) {
      Alert.alert(err?.nativeErrorMessage);
    } finally {
      finishLoading();
    }
  };

  const paddingBottom = isKeyboardVisible ? 10 : insets.bottom;

  return (
    <BackgroundView>
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.wrapper, { paddingTop: insets.top }]}
      >
        <Text variant="headlineLarge" style={styles.title}>
          {title}
        </Text>

        <View style={{ gap: theme.spacing.large }}>
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="Email"
                value={value}
                mode="outlined"
                autoCapitalize="none"
                errorMessage={error?.message}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="Password"
                value={value}
                mode="outlined"
                secureTextEntry
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <View style={[styles.buttonWrapper, { paddingBottom }]}>
          <Button
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit(handleFormSubmit)}
          >
            {buttonTitle}
          </Button>
          <Button onPress={onNavigate}>{navigateButtonTitle}</Button>
        </View>
      </KeyboardAvoidingView>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    marginBottom: 12,
  },
  buttonWrapper: {
    flex: 1,
    gap: 10,
    justifyContent: 'flex-end',
  },
});

export default AuthForm;
