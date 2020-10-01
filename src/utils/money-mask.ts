import { MaskService } from 'react-native-masked-text';

const moneySettings = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: '',
  suffixUnit: '',
};

export function toMoney(value: string): string {
  return MaskService.toMask('money', value, moneySettings);
}

export function fromMoney(value: string): string {
  return MaskService.toRawValue('money', value, moneySettings);
}
