import React, { FC, memo } from 'react';

import { List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { t } from 'i18n-js';

import FadeIcon from '!/components/FadeIcon';
import { DEFAULT_ICON_SIZE } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { CountryWageModel } from '!/stores/models/CountryWageModel';
import { ListItemRightProps, MainRouteProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import { toMoneyMask } from '!/utils/money-mask';

import styles from './styles';

interface Props {
  currencyInfo: CurrencyInfo;
  wage?: CountryWageModel;
  setSelectedId?: (currencyInfoId: CurrencyInfo['id'] | null) => void;
  isSelected?: boolean;
  isActive?: boolean;
}

const CurrencyItem: FC<Props> = ({ currencyInfo, wage, setSelectedId, isSelected, isActive }) => {
  const { params } = useRoute<MainRouteProp<'Currencies'>>();
  const { colors } = useTheme();

  const { currency, countryName, hourlyWage } = currencyInfo;

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
      description={`${countryName} • ${
        wage?.value || hourlyWage ? `${toMoneyMask(wage?.value || hourlyWage || 0)}/${t('hr')}` : t('unknown')
      }`}
      disabled={params.action === 'productForm' ? false : isActive}
      onPress={handleOnPress}
      right={params.action === 'productForm' || !isActive ? renderRight : undefined}
      title={currency}
    />
  );
};

export default memo(CurrencyItem);
