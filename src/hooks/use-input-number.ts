import { useCallback, useState } from 'react';

import toCurrency from '!/utils/to-currency';
import toNumber from '!/utils/to-number';

import useMethod from './use-method';

/**
 * Return state as value and memoized setter for state
 */
export default function useInputNumber(
  initialValue: number,
  currency?: string,
  afterChangeText: (text: number) => void = () => null,
): {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onChangeText: (text: string) => void;
} {
  const [value, setValue] = useState<number>(initialValue);

  const afterValueMemo = useMethod(afterChangeText);

  const onChangeText = useCallback(
    (text: string) => {
      const newValue = currency ? toNumber(text, currency) : Number(text);
      setValue(newValue);
      afterValueMemo(newValue);
    },
    [afterValueMemo, currency],
  );

  return {
    value: currency ? toCurrency(value, currency) : String(value),
    setValue,
    onChangeText,
  };
}
