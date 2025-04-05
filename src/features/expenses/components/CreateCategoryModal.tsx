import { useEffect, useState } from 'react';
import {
  ModalProps,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

import CommonModal from '@/components/CommonModal';
import { DEVICE_HEIGHT } from '@/constants/Device';
import { useTheme } from '@/hooks';

import { CategoryTypeEnum, CreateCategory } from '../types';
import { useCategories } from '../hooks';
import { useUserStore } from '@/features/auth';
import CategoryTypesSelector from './CategoryTypesSelector';

const CATEGORY_ICONS = [
  'format-list-bulleted',
  'star-outline',
  'heart-outline',
  'check-circle-outline',
  'calendar',
  'clock-outline',
  'notebook-outline',
  'music-note',
  'food',
  'dumbbell',
];

type CreateCategoryModalProps = ModalProps & {
  onClose: () => void;
};

const CreateCategoryModal = ({
  visible,
  onClose,
  ...rest
}: CreateCategoryModalProps) => {
  const { theme } = useTheme();
  const { user } = useUserStore();
  const { isAddingCategoryLoading, addCategory } = useCategories();

  const [categoryValues, setCategoryValues] = useState<CreateCategory>({
    name: '',
    type: CategoryTypeEnum.Expense,
    icon: '',
  });

  useEffect(() => {
    if (!visible) {
      setCategoryValues({
        name: '',
        type: CategoryTypeEnum.Expense,
        icon: '',
      });
    }
  }, [visible]);

  const handleCreate = () => {
    addCategory({
      ...categoryValues,
      userId: user?.uid as string,
      createdAt: firestore.Timestamp.fromDate(dayjs().toDate()),
    }).then(onClose);
  };

  const changeCategoryValues =
    (key: keyof CreateCategory) => (value: string | CategoryTypeEnum) => {
      setCategoryValues({ ...categoryValues, [key]: value });
    };

  const isDisabled = !categoryValues.icon || !categoryValues.name.trim();

  return (
    <CommonModal visible={visible} onClose={onClose} {...rest}>
      <Text variant="titleLarge" style={styles.title}>
        Create category
      </Text>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formWrapper}>
          <CategoryTypesSelector
            type={categoryValues.type}
            onChange={changeCategoryValues('type')}
          />

          <TextInput
            label="Title"
            mode="outlined"
            onChangeText={changeCategoryValues('name')}
          />

          <View>
            <Text variant="labelLarge" style={styles.iconLabel}>
              Select icon
            </Text>
            <View style={styles.iconsList}>
              {CATEGORY_ICONS.map((icon) => {
                const isSelected = categoryValues.icon === icon;

                return (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconItem,
                      {
                        backgroundColor: isSelected
                          ? theme.colors.secondary
                          : theme.colors.primary,
                      },
                    ]}
                    onPress={() => changeCategoryValues('icon')(icon)}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={26}
                      color="white"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          disabled={isDisabled || isAddingCategoryLoading}
          loading={isAddingCategoryLoading}
          onPress={handleCreate}
        >
          Create
        </Button>
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingBottom: 12,
  },
  scrollContainer: {
    maxHeight: DEVICE_HEIGHT / 3,
    paddingBottom: 15,
  },
  iconsList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconItem: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typesWrapperItem: {
    flex: 1,
  },
  formWrapper: {
    gap: 16,
  },
  iconLabel: {
    marginBottom: 6,
  },
  buttonWrapper: {
    paddingVertical: 8,
  },
});

export default CreateCategoryModal;
