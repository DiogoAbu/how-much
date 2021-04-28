import React, { FC, memo } from 'react';

import { List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import FadeIcon from '!/components/FadeIcon';
import { DEFAULT_ICON_SIZE } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { CountryWageModel } from '!/stores/models/CountryWageModel';
import { ListItemRightProps, MainRouteProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';

import styles from './styles';

interface Props {
  currencyInfo: CurrencyInfo;
  wage?: CountryWageModel;
  setSelectedIds?: React.Dispatch<React.SetStateAction<CurrencyInfo['id'][]>>;
  isSelected?: boolean;
  isActive?: boolean;
  allowMultiple?: boolean;
}

const CurrencyItem: FC<Props> = ({
  currencyInfo,
  wage,
  setSelectedIds,
  isSelected,
  isActive,
  allowMultiple,
}) => {
  const { params } = useRoute<MainRouteProp<'Currencies'>>();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { currency, countryName, hourlyWage } = currencyInfo;

  const handleOnPress = usePress(() => {
    requestAnimationFrame(() => {
      if (!allowMultiple) {
        setSelectedIds?.(isSelected ? [] : [currencyInfo.id]);
      } else {
        setSelectedIds?.((prev) => {
          const next = [...prev];
          const index = next.indexOf(currencyInfo.id);
          if (index >= 0) {
            next.splice(index, 1);
          } else {
            next.push(currencyInfo.id);
          }
          return next;
        });
      }
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
      description={`${t(`countryName.${stripCountryName(countryName)}`, { defaultValue: countryName })} • ${
        wage?.value || hourlyWage
          ? `${toCurrency(wage?.value || hourlyWage || 0, currency)}/${t('hr')}`
          : t('unknown')
      }`}
      disabled={params.action === 'productForm' ? false : isActive}
      onPress={handleOnPress}
      right={params.action === 'productForm' || !isActive ? renderRight : undefined}
      title={currency}
    />
  );
};

export default memo(CurrencyItem);
