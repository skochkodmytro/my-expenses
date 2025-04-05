import { View, StyleSheet, ViewProps } from 'react-native';

import { useTheme } from '@/hooks';

const BackgroundView = ({ children, style, ...rest }: ViewProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing.medium,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default BackgroundView;
