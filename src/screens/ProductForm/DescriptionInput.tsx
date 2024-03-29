import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

import { HelperText, TextInput } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING } from '!/constants';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { ProductModel } from '!/stores/models/ProductModel';

interface Props {
  productForm: ProductModel | null;
  descriptionError: string;
  blurOnSubmit?: boolean;
  handleOnChange?: (text: string) => void;
  handleOnSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

const DescriptionInput = observer<Props, NativeTextInput>(
  ({ productForm, descriptionError, blurOnSubmit, handleOnChange, handleOnSubmit }, ref) => {
    const { dark } = useTheme();
    const { t } = useTranslation();

    const handleOnChangeText = useCallback(
      (text: string) => {
        productForm?.setDescription(text);
        handleOnChange?.(text);
      },
      [handleOnChange, productForm],
    );

    return (
      <View style={{ paddingHorizontal: DEFAULT_PADDING, paddingTop: DEFAULT_PADDING * 2 }}>
        <TextInput
          autoCompleteType='off'
          autoCorrect={false}
          autoFocus
          blurOnSubmit={blurOnSubmit}
          error={!!descriptionError}
          keyboardAppearance={dark ? 'dark' : 'light'}
          label={t('description')}
          maxLength={100}
          mode='outlined'
          onChangeText={handleOnChangeText}
          onSubmitEditing={handleOnSubmit}
          ref={ref}
          returnKeyType='next'
          style={{ marginTop: DEFAULT_PADDING }}
          value={productForm?.description}
        />
        <HelperText style={{ marginBottom: DEFAULT_PADDING / 2 }} type='error' visible>
          {descriptionError}
        </HelperText>
      </View>
    );
  },
  { forwardRef: true },
);

export default DescriptionInput;
