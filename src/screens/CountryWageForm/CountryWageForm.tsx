import React, { FC, useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';

import { Divider, List, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import EmptyCenteredView from '!/components/EmptyCenteredView';
import HeaderButton from '!/components/HeaderButton';
import { DEFAULT_APPBAR_HEIGHT, DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp, MainRouteProp } from '!/types';
import findCurrency from '!/utils/find-currency';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';
import toNumber from '!/utils/to-number';

import styles from './styles';

const CountryWageForm: FC = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'CountryWageForm'>>();
  const { params } = useRoute<MainRouteProp<'CountryWageForm'>>();
  const { generalStore, wagesStore } = useStores();
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const currency = useMemo(() => findCurrency(params.currencyId), [params.currencyId]);

  const handleWageValueChange = useCallback(
    (text: string) => {
      wagesStore.wageForm?.setValue(toNumber(text, currency!.currency));
    },
    [currency, wagesStore.wageForm],
  );

  const handleDone = usePress(() => {
    wagesStore.addWageToList();

    requestAnimationFrame(() => {
      navigation.pop();
    });
  });

  const handleHourlyWageInfo = usePress(() => {
    requestAnimationFrame(() => {
      // navigation.navigate('WageCalculator');
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('editingWage'),
      headerRight: () => (
        <HeaderButton icon='check' mode='text' onPress={handleDone}>
          {t('label.done')}
        </HeaderButton>
      ),
    });
  }, [generalStore, handleDone, navigation, t]);

  if (!currency) {
    return <EmptyCenteredView text={t('currencyNotFound')} />;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { padding: DEFAULT_PADDING, paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT + DEFAULT_PADDING },
      ]}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: colors.background }}
    >
      <List.Item
        left={(props) => (
          <Text {...props} style={[props.style, styles.itemRight]}>
            {t('currency')}
          </Text>
        )}
        right={(props) => (
          <Text {...props} style={[props.style, styles.itemRight]}>
            {currency.currency}
          </Text>
        )}
        title=''
      />

      <Divider />

      <List.Item
        left={(props) => (
          <Text {...props} style={[props.style, styles.itemRight]}>
            {t('country')}
          </Text>
        )}
        right={(props) => (
          <Text {...props} style={[props.style, styles.itemRight]}>
            {t(`countryName.${stripCountryName(currency.countryName)}`, {
              defaultValue: currency.countryName,
            })}
          </Text>
        )}
        title=''
      />

      <Divider />

      <TextInput
        autoCompleteType='off'
        autoCorrect={false}
        keyboardAppearance={dark ? 'dark' : 'light'}
        keyboardType='decimal-pad'
        label={t('hourlyWageValue')}
        maxLength={14}
        mode='outlined'
        onChangeText={handleWageValueChange}
        returnKeyType='done'
        right={
          <TextInput.Icon
            color={colors.text}
            forceTextInputFocus={false}
            name='information-outline'
            onPress={handleHourlyWageInfo}
          />
        }
        style={styles.input}
        value={toCurrency(wagesStore.wageForm?.value ?? 0, currency.currency)}
      />
    </ScrollView>
  );
});

export default CountryWageForm;
