import { MaskService } from 'react-native-masked-text';

const floatSettings = {
  precision: 1,
  separator: ',',
  delimiter: '.',
  unit: '',
  suffixUnit: '',
};

export function toFloatMask(value: number): string {
  // Money mask accepts number
  return MaskService.toMask('money', (value as unknown) as string, floatSettings);
}

export function toFloatRaw(value: string): number {
  // Money mask returns number
  return (MaskService.toRawValue('money', value, floatSettings) as unknown) as number;
}
