import React, { FC, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, View } from 'react-native';

import { Caption, Divider, List, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

import HeaderButton from '!/components/HeaderButton';
import { DEFAULT_PADDING, LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import useInputNumber from '!/hooks/use-input-number';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp, MainRouteProp } from '!/types';
import findCurrency from '!/utils/find-currency';
import { focusNext } from '!/utils/scroll-into-view';
import toCurrency from '!/utils/to-currency';
import toNumber from '!/utils/to-number';
import {
  annualWageToDailyWage,
  annualWageToHourlyWage,
  annualWageToMonthlyWage,
  annualWageToWeeklyWage,
  dailyWageToAnnualWage,
  dailyWageToHourlyWage,
  dailyWageToMonthlyWage,
  dailyWageToWeeklyWage,
  monthlyWageToAnnualWage,
  monthlyWageToDailyWage,
  monthlyWageToHourlyWage,
  monthlyWageToWeeklyWage,
  weeklyWageToAnnualWage,
  weeklyWageToDailyWage,
  weeklyWageToHourlyWage,
  weeklyWageToMonthlyWage,
} from '!/utils/wage-helpers';

import CommonInput from './CommonInput';
import styles from './styles';

const WageCalculator: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'WageCalculator'>>();
  const { params } = useRoute<MainRouteProp<'WageCalculator'>>();

  const currency = useMemo(() => findCurrency(params.currencyId), [params.currencyId]);

  const { generalStore, wagesStore } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const scrollRef = useRef<ScrollView | null>(null);
  const dailyWorkingHoursRef = useRef<NativeTextInput | null>(null);
  const daysAWeekRef = useRef<NativeTextInput | null>(null);
  const weeklyWorkingHoursRef = useRef<NativeTextInput | null>(null);
  const weeksInAYearRef = useRef<NativeTextInput | null>(null);
  const annualWageRef = useRef<NativeTextInput | null>(null);
  const monthlyWageRef = useRef<NativeTextInput | null>(null);
  const weeklyWageRef = useRef<NativeTextInput | null>(null);
  const dailyWageRef = useRef<NativeTextInput | null>(null);

  const dailyWorkingHours = useInputNumber(8, undefined, (value) => {
    const inputs = {
      dailyWorkingHours: value,
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(annualWageToDailyWage(inputs));
    weeklyWage.setValue(annualWageToWeeklyWage(inputs));
    monthlyWage.setValue(annualWageToMonthlyWage(inputs));
    annualWage.setValue(dailyWageToAnnualWage(inputs));
    setHourlyWage(annualWageToHourlyWage(inputs));
  });
  const daysAWeek = useInputNumber(5, undefined, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: value,
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(annualWageToDailyWage(inputs));
    weeklyWage.setValue(annualWageToWeeklyWage(inputs));
    monthlyWage.setValue(annualWageToMonthlyWage(inputs));
    annualWage.setValue(dailyWageToAnnualWage(inputs));
    setHourlyWage(annualWageToHourlyWage(inputs));
  });
  const weeklyWorkingHours = useInputNumber(
    Number(dailyWorkingHours.value) * Number(daysAWeek.value),
    undefined,
    (value) => {
      const inputs = {
        dailyWorkingHours: Number(dailyWorkingHours.value),
        daysAWeek: Number(daysAWeek.value),
        weeklyWorkingHours: value,
        weeksInAYear: Number(weeksInAYear.value),
        annualWage: toNumber(annualWage.value, currency?.currency),
        monthlyWage: toNumber(monthlyWage.value, currency?.currency),
        weeklyWage: toNumber(weeklyWage.value, currency?.currency),
        dailyWage: toNumber(dailyWage.value, currency?.currency),
      };
      dailyWage.setValue(annualWageToDailyWage(inputs));
      weeklyWage.setValue(annualWageToWeeklyWage(inputs));
      monthlyWage.setValue(annualWageToMonthlyWage(inputs));
      annualWage.setValue(dailyWageToAnnualWage(inputs));
      setHourlyWage(annualWageToHourlyWage(inputs));
    },
  );
  const weeksInAYear = useInputNumber(52, undefined, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: value,
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(annualWageToDailyWage(inputs));
    weeklyWage.setValue(annualWageToWeeklyWage(inputs));
    monthlyWage.setValue(annualWageToMonthlyWage(inputs));
    annualWage.setValue(dailyWageToAnnualWage(inputs));
    setHourlyWage(annualWageToHourlyWage(inputs));
  });

  const annualWage = useInputNumber(0.0, currency?.currency, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: value,
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(annualWageToDailyWage(inputs));
    weeklyWage.setValue(annualWageToWeeklyWage(inputs));
    monthlyWage.setValue(annualWageToMonthlyWage(inputs));
    setHourlyWage(annualWageToHourlyWage(inputs));
  });

  const monthlyWage = useInputNumber(0.0, currency?.currency, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: value,
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(monthlyWageToDailyWage(inputs));
    weeklyWage.setValue(monthlyWageToWeeklyWage(inputs));
    annualWage.setValue(monthlyWageToAnnualWage(inputs));
    setHourlyWage(monthlyWageToHourlyWage(inputs));
  });

  const weeklyWage = useInputNumber(0.0, currency?.currency, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: value,
      dailyWage: toNumber(dailyWage.value, currency?.currency),
    };
    dailyWage.setValue(weeklyWageToDailyWage(inputs));
    monthlyWage.setValue(weeklyWageToMonthlyWage(inputs));
    annualWage.setValue(weeklyWageToAnnualWage(inputs));
    setHourlyWage(weeklyWageToHourlyWage(inputs));
  });

  const dailyWage = useInputNumber(0.0, currency?.currency, (value) => {
    const inputs = {
      dailyWorkingHours: Number(dailyWorkingHours.value),
      daysAWeek: Number(daysAWeek.value),
      weeklyWorkingHours: Number(weeklyWorkingHours.value),
      weeksInAYear: Number(weeksInAYear.value),
      annualWage: toNumber(annualWage.value, currency?.currency),
      monthlyWage: toNumber(monthlyWage.value, currency?.currency),
      weeklyWage: toNumber(weeklyWage.value, currency?.currency),
      dailyWage: value,
    };
    weeklyWage.setValue(dailyWageToWeeklyWage(inputs));
    monthlyWage.setValue(dailyWageToMonthlyWage(inputs));
    annualWage.setValue(dailyWageToAnnualWage(inputs));
    setHourlyWage(dailyWageToHourlyWage(inputs));
  });

  const [hourlyWage, setHourlyWage] = useState(0);

  const handleHowManyHoursYouWorkDaily = usePress(() => {
    Alert.alert(t('dailyWorkHours'), t('howManyHoursYouWorkDaily'), undefined, { cancelable: true });
  });
  const handleHowManyDaysYouWorkInAWeek = usePress(() => {
    Alert.alert(t('workDaysInAWeek'), t('howManyDaysYouWorkInAWeek'), undefined, { cancelable: true });
  });
  const handleHowManyHoursYouWorkWeekly = usePress(() => {
    Alert.alert(t('weeklyWorkHours'), t('howManyHoursYouWorkWeekly'), undefined, { cancelable: true });
  });
  const handleHowManyWeeksInAYear = usePress(() => {
    Alert.alert(t('weeksInAYear'), t('howManyWeeksInAYear'), undefined, { cancelable: true });
  });

  const handleSetHourlyWage = usePress(() => {
    if (params.isFromForm && hourlyWage) {
      wagesStore.wageForm?.setValue(hourlyWage);
    }
    requestAnimationFrame(() => {
      navigation.pop();
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.wageCalculator'),
    });

    // Cannot have a blur function
  }, [generalStore, navigation, t]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { padding: DEFAULT_PADDING, paddingTop: headerHeight },
        ]}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        ref={scrollRef}
        style={{ backgroundColor: colors.background }}
      >
        <Caption style={styles.captionMarginVertical}>{t('general')}</Caption>
        <View style={styles.flexRow}>
          <CommonInput
            containerStyle={[styles.inputContainerRow, { marginRight: DEFAULT_PADDING * 2 }]}
            label={t('dailyWorkHours')}
            left={
              <TextInput.Icon
                color={colors.text}
                forceTextInputFocus={false}
                name='information-outline'
                onPress={handleHowManyHoursYouWorkDaily}
              />
            }
            {...dailyWorkingHours}
            onSubmitEditing={focusNext(daysAWeekRef, scrollRef, true, LIST_ITEM_HEIGHT)}
            ref={dailyWorkingHoursRef}
          />
          <CommonInput
            containerStyle={styles.inputContainerRow}
            label={t('workDaysInAWeek')}
            left={
              <TextInput.Icon
                color={colors.text}
                forceTextInputFocus={false}
                name='information-outline'
                onPress={handleHowManyDaysYouWorkInAWeek}
              />
            }
            {...daysAWeek}
            onSubmitEditing={focusNext(weeklyWorkingHoursRef, scrollRef, true, LIST_ITEM_HEIGHT)}
            ref={daysAWeekRef}
          />
        </View>
        <View style={styles.flexRow}>
          <CommonInput
            containerStyle={[styles.inputContainerRow, { marginRight: DEFAULT_PADDING * 2 }]}
            label={t('weeklyWorkHours')}
            left={
              <TextInput.Icon
                color={colors.text}
                forceTextInputFocus={false}
                name='information-outline'
                onPress={handleHowManyHoursYouWorkWeekly}
              />
            }
            {...weeklyWorkingHours}
            onSubmitEditing={focusNext(weeksInAYearRef, scrollRef, true, LIST_ITEM_HEIGHT)}
            ref={weeklyWorkingHoursRef}
          />
          <CommonInput
            containerStyle={styles.inputContainerRow}
            label={t('weeksInAYear')}
            left={
              <TextInput.Icon
                color={colors.text}
                forceTextInputFocus={false}
                name='information-outline'
                onPress={handleHowManyWeeksInAYear}
              />
            }
            {...weeksInAYear}
            onSubmitEditing={focusNext(dailyWageRef, scrollRef, true, LIST_ITEM_HEIGHT)}
            ref={weeksInAYearRef}
          />
        </View>

        <Divider />

        <Caption style={styles.captionMarginVertical}>{t('wage')}</Caption>
        <CommonInput
          label={t('label.dailyWage')}
          {...dailyWage}
          onSubmitEditing={focusNext(weeklyWageRef, scrollRef, true, LIST_ITEM_HEIGHT)}
          ref={dailyWageRef}
        />
        <CommonInput
          label={t('label.weeklyWage')}
          {...weeklyWage}
          onSubmitEditing={focusNext(monthlyWageRef, scrollRef, true, LIST_ITEM_HEIGHT)}
          ref={weeklyWageRef}
        />
        <CommonInput
          label={t('label.monthlyWage')}
          {...monthlyWage}
          onSubmitEditing={focusNext(annualWageRef, scrollRef, true, LIST_ITEM_HEIGHT)}
          ref={monthlyWageRef}
        />
        <CommonInput label={t('label.annualWage')} {...annualWage} isLast ref={annualWageRef} />
      </ScrollView>

      <Divider />
      <List.Item
        description={t('label.hourlyWage')}
        descriptionStyle={{ color: colors.textOnPrimary, opacity: Number(0.6) }}
        right={
          params.isFromForm
            ? ({ style }) => (
                <HeaderButton
                  icon='check'
                  mode='contained'
                  onPress={handleSetHourlyWage}
                  style={[style, styles.hourlyWageRight]}
                >
                  {t('label.done')}
                </HeaderButton>
              )
            : undefined
        }
        style={{ backgroundColor: colors.primary, padding: DEFAULT_PADDING / 2 }}
        title={toCurrency(hourlyWage, currency?.currency)}
        titleStyle={{ color: colors.textOnPrimary }}
      />
    </View>
  );
};

export default WageCalculator;
