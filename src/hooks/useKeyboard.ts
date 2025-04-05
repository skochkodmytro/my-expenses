import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

import { isIOS } from '@/constants/Device';

import useBoolean from './useBoolean';

const useKeyboard = () => {
  const { value: isKeyboardVisible, setTrue, setFalse } = useBoolean(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardShow = (event: KeyboardEvent) => {
      setTrue();
      setKeyboardHeight(event.endCoordinates.height);
    };

    const onKeyboardHide = () => {
      setFalse();
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener(
      isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      onKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      onKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setTrue, setFalse]);

  return { isKeyboardVisible, keyboardHeight };
};

export default useKeyboard;
