import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Divider, List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from 'i18n-js';

import { DEFAULT_APPBAR_HEIGHT, DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';

import ColorSchemeItem from './ColorSchemeItem';
import styles from './styles';

interface Props {
  navigation: MainNavigationProp<'Preferences'>;
}

const Preferences: FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const { generalStore } = useStores();
  const insets = useSafeAreaInsets();

  const handleCountriesWagesPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('CountriesWages');
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('preferences'),
    });
  }, [generalStore, navigation]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT + DEFAULT_PADDING },
      ]}
      contentInsetAdjustmentBehavior='automatic'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: colors.background }}
    >
      <List.Item
        left={(props) => (
          <List.Icon {...props} icon='currency-usd' style={[props.style, styles.noMarginRight]} />
        )}
        onPress={handleCountriesWagesPress}
        right={(props) => <List.Icon {...props} icon='chevron-right' />}
        title={t('countriesWages')}
      />

      <Divider />

      <ColorSchemeItem />
    </ScrollView>
  );
};

export default Preferences;
