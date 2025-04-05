import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { CategoryTypeEnum } from '../types';

type CategoryTypesSelectorProps = {
  type: CategoryTypeEnum;
  onChange: (type: CategoryTypeEnum) => void;
};

const CategoryTypesSelector = ({
  type,
  onChange,
}: CategoryTypesSelectorProps) => {
  return (
    <View style={styles.typesWrapper}>
      <View style={styles.typesWrapperItem}>
        <Button
          mode={type === CategoryTypeEnum.Expense ? 'contained' : 'text'}
          onPress={() => onChange(CategoryTypeEnum.Expense)}
        >
          Expense
        </Button>
      </View>
      <View style={styles.typesWrapperItem}>
        <Button
          mode={type === CategoryTypeEnum.Income ? 'contained' : 'text'}
          onPress={() => onChange(CategoryTypeEnum.Income)}
        >
          Income
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typesWrapperItem: {
    flex: 1,
  },
});

export default CategoryTypesSelector;
