import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BackgroundView } from '@/components';
import { useTheme } from '@/hooks';
import { useLogout } from '@/features/auth';

const ProfileView = () => {
  const insets = useSafeAreaInsets();
  const logout = useLogout();
  const { isDarkTheme, theme, toggleTheme } = useTheme();

  return (
    <BackgroundView style={{ paddingTop: insets.top }}>
      <TouchableOpacity style={styles.action} onPress={logout}>
        <Entypo name="log-out" size={22} color={theme.colors.onSurface} />
        <Text variant="titleMedium">Log out</Text>
      </TouchableOpacity>
      <Divider />
      <View style={styles.action}>
        <MaterialCommunityIcons
          name="format-paint"
          size={22}
          color={theme.colors.onSurface}
        />
        <Text variant="titleMedium" style={styles.actionTitle}>
          Dark theme
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  action: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionTitle: {
    flex: 1,
  },
});

export default ProfileView;
