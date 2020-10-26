import React, { forwardRef } from 'react';
import { StyleProp, TextInput as NativeTextInput, TextInputProps, TextStyle } from 'react-native';

import { TextInput } from 'react-native-paper';

import useTheme from '!/hooks/use-theme';

import styles from './styles';

interface Props extends TextInputProps {
  label: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  isLast?: boolean;
  containerStyle?: StyleProp<TextStyle>;
}

const CommonInput = forwardRef<NativeTextInput, Props>(
  ({ label, onChangeText, value, containerStyle, left, right, onSubmitEditing, isLast }, ref) => {
    const { dark } = useTheme();

    return (
      <TextInput
        autoCompleteType='off'
        autoCorrect={false}
        blurOnSubmit={isLast ? true : false}
        keyboardAppearance={dark ? 'dark' : 'light'}
        keyboardType='decimal-pad'
        label={label}
        left={left}
        maxLength={14}
        mode='outlined'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
        render={(props) => <NativeTextInput {...props} style={[props.style, styles.input]} />}
        returnKeyType={isLast ? 'done' : 'next'}
        right={right}
        style={[styles.inputContainer, containerStyle]}
        value={value}
      />
    );
  },
);

export default CommonInput;
