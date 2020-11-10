import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Chip, Paragraph, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import toMaterialStyle from 'material-color-hash';

import { DEFAULT_PADDING } from '!/constants';
import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { MainNavigationProp } from '!/types';
import currencyList, { CurrencyInfo } from '!/utils/currency-list';

import LanguageItem from '../Preferences/LanguageItem';

import styles from './styles';

const amountToGet = 10;
const currencies: CurrencyInfo[] = [];

for (let i = 11; i < currencyList.length; i += 10) {
  const each = currencyList[i];

  if (currencies.length === 0 || !currencies.some((e) => e.currency.charAt(0) === each.currency.charAt(0))) {
    currencies.push(each);
  }

  if (currencies.length === amountToGet) {
    break;
  }
}

interface Props {
  navigation: MainNavigationProp<'Intro'>;
}

const Intro: FC<Props> = ({ navigation }) => {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleGoToCurrencies = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Currencies', { action: 'activeCurrency' });
    });
  });

  useStatusBar();

  return (
    <>
      <View style={[styles.languageContainer, { paddingTop: insets.top + DEFAULT_PADDING }]}>
        <LanguageItem />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title style={styles.textCenter}>{t('title.welcome')}</Title>

        <Paragraph style={styles.textCenter}>
          {t('toStartUsingThisAppYouNeedToPickYourPreferredCurrency')}
        </Paragraph>

        <View style={styles.marginView} />

        <Paragraph style={styles.textCenter}>{t('weHaveLotsToChooseFrom')}</Paragraph>

        <View style={styles.currenciesContainer}>
          {currencies.map((e) => {
            const { color, backgroundColor } = toMaterialStyle(e.id, dark ? 700 : 600);
            return (
              <Chip key={e.id} style={[styles.currencyChip, { backgroundColor }]} textStyle={{ color }}>
                {e.currency}
              </Chip>
            );
          })}
        </View>

        <Paragraph style={styles.textCenter}>
          {t('andThisAmountMore', { amount: currencyList.length - amountToGet })}
        </Paragraph>

        <View style={styles.marginView} />

        <Paragraph style={styles.textCenter}>{t('dontWorryYouCanChangeItLater')}</Paragraph>
      </ScrollView>

      <Button mode='contained' onPress={handleGoToCurrencies} style={styles.button}>
        {t('label.goPickCurrency')}
      </Button>
    </>
  );
};

export default Intro;
