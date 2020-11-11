import React, { FC } from 'react';
import { Platform, ScrollView } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge, Caption, Divider, List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Observer } from 'mobx-react-lite';

import { BADGE_SMALL_SIZE, DEFAULT_APPBAR_HEIGHT, DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';

import ColorSchemeItem from './ColorSchemeItem';
import LanguageItem from './LanguageItem';
import styles from './styles';

interface Props {
  navigation: MainNavigationProp<'Preferences'>;
}

const Preferences: FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const { generalStore } = useStores();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleCountriesWagesPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('CountriesWages');
    });
  });

  const handleGoToWageCalculator = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('WageCalculator', {
        currencyId: generalStore.activeCurrencyId!,
        isFromForm: false,
      });
    });
  });

  const handleNewUpdateReload = usePress(() => {
    requestAnimationFrame(() => {
      void Updates.reloadAsync();
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.preferences'),
    });
  }, [generalStore, navigation, t]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop:
            insets.top +
            Platform.select({ default: DEFAULT_APPBAR_HEIGHT, ios: DEFAULT_PADDING }) +
            DEFAULT_PADDING,
        },
      ]}
      contentInsetAdjustmentBehavior='automatic'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      scrollIndicatorInsets={{
        top: insets.top + Platform.select({ default: DEFAULT_APPBAR_HEIGHT, ios: DEFAULT_PADDING }),
      }}
      style={{ backgroundColor: colors.background }}
    >
      <List.Item
        left={(props) => (
          <List.Icon {...props} icon='currency-usd' style={[props.style, styles.noMarginRight]} />
        )}
        onPress={handleCountriesWagesPress}
        right={(props) => <List.Icon {...props} icon='chevron-right' />}
        title={t('title.countriesWages')}
      />

      <Divider />

      <List.Item
        left={(props) => (
          <List.Icon {...props} icon='calculator' style={[props.style, styles.noMarginRight]} />
        )}
        onPress={handleGoToWageCalculator}
        right={(props) => <List.Icon {...props} icon='chevron-right' />}
        title={t('title.wageCalculator')}
      />

      <Divider />

      <LanguageItem />

      <Divider />

      <ColorSchemeItem />

      <Divider />

      <Caption style={styles.version}>
        v{Constants.manifest.version}
        {Constants.manifest.releaseChannel ? ` (${Constants.manifest.releaseChannel})` : null}
      </Caption>

      <Observer>
        {() =>
          generalStore.updateAvailable ? (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={handleNewUpdateReload}
              style={styles.newUpdateContainer}
            >
              <>
                <Badge size={BADGE_SMALL_SIZE} style={styles.newUpdateBadge} visible />
                <Caption>{t('newUpdateAvailableTapToReload')}</Caption>
              </>
            </TouchableOpacity>
          ) : null
        }
      </Observer>
    </ScrollView>
  );
};

export default Preferences;
