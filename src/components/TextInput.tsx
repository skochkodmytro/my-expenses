import { View } from 'react-native';
import {
  HelperText,
  TextInput as RNPTextInput,
  TextInputProps as RNPTextInputProps,
} from 'react-native-paper';

type TextInputProps = RNPTextInputProps & {
  errorMessage?: string;
};

const TextInput = ({ errorMessage, error, ...rest }: TextInputProps) => {
  return (
    <View>
      <RNPTextInput error={error || !!errorMessage} {...rest} />
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </View>
  );
};

export default TextInput;
