import { MaskService } from 'react-native-masked-text';

const moneySettings = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: '',
  suffixUnit: '',
};

export function toMoneyMask(value: number): string {
  // Money mask accepts number
  return MaskService.toMask('money', (value as unknown) as string, moneySettings);
}

export function toMoneyRaw(value: string): number {
  // Money mask returns number
  return (MaskService.toRawValue('money', value, moneySettings) as unknown) as number;
}
