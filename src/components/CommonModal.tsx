import { ReactNode } from 'react';
import {
  Keyboard,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useKeyboard, useTheme } from '@/hooks';

type CommonModalProps = ModalProps & {
  children: ReactNode;
  onClose: () => void;
};

const CommonModal = ({ children, onClose, ...rest }: CommonModalProps) => {
  const insets = useSafeAreaInsets();
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const { theme } = useTheme();

  const handleOnOverlayClick = () => {
    if (isKeyboardVisible) {
      return Keyboard.dismiss();
    }

    onClose();
  };

  const paddingBottom = isKeyboardVisible ? keyboardHeight + 10 : insets.bottom;

  return (
    <Modal style={styles.modal} transparent animationType="fade" {...rest}>
      <Pressable style={styles.modalOverlay} onPress={handleOnOverlayClick} />

      <View
        style={[
          styles.modalContent,
          { paddingBottom, backgroundColor: theme.colors.background },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
  },
  modalOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.7,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default CommonModal;
