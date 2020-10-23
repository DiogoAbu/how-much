import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';

import { HelperText, TextInput } from 'react-native-paper';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import useTheme from '!/hooks/use-theme';
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

    const handleOnChangeText = useCallback(
      (text: string) => {
        productForm?.setDescription(text);
        handleOnChange?.(text);
      },
      [handleOnChange, productForm],
    );

    return (
      <>
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
          value={productForm?.description}
        />
        <HelperText type='error' visible>
          {descriptionError}
        </HelperText>
      </>
    );
  },
  { forwardRef: true },
);

export default DescriptionInput;
