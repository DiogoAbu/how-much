import React, { FC, memo } from 'react';

import { List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import FadeIcon from '!/components/FadeIcon';
import { DEFAULT_ICON_SIZE } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { ListItemRightProps, MainRouteProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';

import styles from './styles';

interface Props {
  currencyInfo: CurrencyInfo;
  setSelectedId?: (currencyInfoId: CurrencyInfo['id'] | null) => void;
  isSelected?: boolean;
  isActive?: boolean;
}

const CurrencyItem: FC<Props> = ({ currencyInfo, setSelectedId, isSelected, isActive }) => {
  const { params } = useRoute<MainRouteProp<'Currencies'>>();
  const { colors } = useTheme();

  const { countryCode, currency, countryName: name } = currencyInfo;

  const handleOnPress = usePress(() => {
    requestAnimationFrame(() => {
      setSelectedId?.(isSelected ? null : currencyInfo.id);
    });
  });

  const renderRight = (props: ListItemRightProps) => (
    <FadeIcon
      {...props}
      color={colors.accent}
      size={DEFAULT_ICON_SIZE}
      source='check-bold'
      style={[props.style, styles.currencyItemRight]}
      visible={isSelected ?? false}
    />
  );

  return (
    <List.Item
      description={`${countryCode} • ${name}`}
      disabled={params.action === 'productForm' ? false : isActive}
      onPress={handleOnPress}
      right={params.action === 'productForm' || !isActive ? renderRight : undefined}
      title={currency}
    />
  );
};

export default memo(CurrencyItem);
