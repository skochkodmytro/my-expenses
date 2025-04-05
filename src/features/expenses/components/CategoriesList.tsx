import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/hooks';

import useCategories from '../hooks/useCategories';
import { CategoryTypeEnum } from '../types';

type CategoriesListProps = {
  selectedIds: string[];
  type?: CategoryTypeEnum;
  onPressCategory: (id: string) => void;
  onPressAdd?: () => void;
};

const CategoriesList = ({
  selectedIds,
  type = CategoryTypeEnum.Expense,
  onPressCategory,
  onPressAdd,
}: CategoriesListProps) => {
  const { theme } = useTheme();
  const { categories } = useCategories();

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => c.type === type);
  }, [type, categories]);

  return (
    <View style={styles.list}>
      {filteredCategories.map((category) => {
        const isSelected = selectedIds.includes(category.id);

        return (
          <View key={category.id} style={styles.itemWrapper}>
            <TouchableOpacity
              style={[
                styles.item,
                {
                  backgroundColor: isSelected
                    ? theme.colors.secondary
                    : theme.colors.primary,
                },
              ]}
              onPress={() => onPressCategory(category.id)}
            >
              <MaterialCommunityIcons
                name={category.icon}
                color="white"
                size={36}
              />
            </TouchableOpacity>
            <Text variant="labelSmall">{category.name}</Text>
          </View>
        );
      })}

      {onPressAdd ? (
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item} onPress={onPressAdd}>
            <MaterialCommunityIcons
              name="plus"
              color={theme.colors.primary}
              size={36}
            />
          </TouchableOpacity>
          <Text variant="labelSmall">Add</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemWrapper: {
    alignItems: 'center',
  },
  item: {
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesList;
