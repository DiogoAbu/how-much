import { FC } from 'react';

// @ts-ignore
import CrossFadeIconPaper from 'react-native-paper/lib/module/components/CrossFadeIcon';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface Props {
  source: IconSource;
  color: string;
  size: number;
  theme?: ReactNativePaper.Theme;
}

const CrossFadeIcon = CrossFadeIconPaper as FC<Props>;

export default CrossFadeIcon;
