import { Pressable, StyleSheet, View } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import dayjs from 'dayjs';

import { useBoolean } from '@/hooks';
import { dateTimeFormat } from '@/utils/date';

import TextInput from './TextInput';

interface DateTimePickerInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  datePickerProps?: Omit<DatePickerProps, 'date'>;
}

const DateTimePickerInput = ({
  label,
  value,
  onChange,
  datePickerProps,
}: DateTimePickerInputProps) => {
  const {
    value: open,
    setTrue: openPicker,
    setFalse: closePicker,
  } = useBoolean(false);

  return (
    <View>
      <View>
        <TextInput
          label={label}
          mode="outlined"
          value={value ? dayjs(value).format(dateTimeFormat) : ''}
          onFocus={openPicker}
          editable={false}
        />

        <Pressable style={styles.inputOverlay} onPress={openPicker} />
      </View>
      {open && (
        <DatePicker
          modal
          open={open}
          date={value || new Date()}
          mode="datetime"
          onConfirm={(date) => {
            onChange(date);
            closePicker();
          }}
          onCancel={closePicker}
          {...datePickerProps}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
});

export default DateTimePickerInput;
