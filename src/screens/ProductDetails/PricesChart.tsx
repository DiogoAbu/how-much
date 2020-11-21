import React, { useCallback, useRef } from 'react';
import { Alert, useWindowDimensions, View } from 'react-native';

import { ActivityIndicator, Caption, Chip, Colors, FAB, Text } from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import toMaterialStyle from 'material-color-hash';
import { observer } from 'mobx-react-lite';
// @ts-ignore
import sortArray from 'sort-array';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory-native';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { ProductModel } from '!/stores/models/ProductModel';
import calculateWorkingHours from '!/utils/calculate-working-hours';
import { CurrencyInfo } from '!/utils/currency-list';
import findCurrency from '!/utils/find-currency';
import formatDate from '!/utils/format-date';
import notEmpty from '!/utils/not-empty';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';

import styles from './styles';

interface Props {
  product: ProductModel;
  shouldRender: boolean;
  setSnackBarText: React.Dispatch<React.SetStateAction<string>>;
}

type ChartData = {
  id: string;
  currencyId: string;
  value: number;
  currencyInfo: CurrencyInfo;
  hourlyWage: number;
  workingHours: number;
};

const PricesChart = observer<Props>(({ product, shouldRender, setSnackBarText }) => {
  const { wagesStore } = useStores();
  const { colors, dark } = useTheme();
  const dimensions = useWindowDimensions();
  const { t } = useTranslation();

  const viewShotRef = useRef<ViewShot | null>(null);

  const takeScreenshot = useCallback(async (): Promise<string | null> => {
    if (!viewShotRef.current?.capture) {
      Alert.alert(t('title.oops'), t('contentNotLoadedTryAgain'));
      return null;
    }
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(t('title.oops'), t('sharingUnavailable'));
      return null;
    }

    const imageUri = await viewShotRef.current.capture();
    return imageUri;
  }, [t]);

  const handleSharePress = usePress(async () => {
    try {
      const imageUri = await takeScreenshot();
      if (!imageUri) {
        Alert.alert(t('title.oops'), t('somethingWentWrong'));
        return;
      }

      await Sharing.shareAsync(imageUri);
    } catch (err) {
      console.log(err);
      Alert.alert(t('title.oops'), t('somethingWentWrong'));
    }
  });

  const handleDownloadPress = usePress(() => {
    Alert.alert(
      t('saveInGallery'),
      t('doYouWantToSaveThisChartIntoYourGallery'),
      [
        {
          text: t('label.no'),
        },
        {
          text: t('label.yes'),
          onPress: async () => {
            try {
              const { status } = await MediaLibrary.requestPermissionsAsync();
              if (status !== MediaLibrary.PermissionStatus.GRANTED) {
                Alert.alert(t('title.oops'), t('accessToGaleryDenied'));
              }

              const imageUri = await takeScreenshot();
              if (!imageUri) {
                Alert.alert(t('title.oops'), t('somethingWentWrong'));
                return;
              }

              const imageAsset = await MediaLibrary.createAssetAsync(imageUri);
              await MediaLibrary.createAlbumAsync(t('howMuch'), imageAsset, false);

              setSnackBarText(t('chartImageSavedInGallery'));
            } catch (err) {
              console.log(err);
              Alert.alert(t('title.oops'), t('somethingWentWrong'));
            }
          },
        },
      ],
      { cancelable: true },
    );
  });

  let theme = VictoryTheme.material;
  theme = {
    ...theme,
    axis: {
      ...theme.axis,
      style: {
        ...(theme.axis?.style ?? {}),
        tickLabels: {
          ...(theme.axis?.style?.tickLabels ?? {}),
          // @ts-ignore
          fill: colors.text,
        },
      },
    },
  };

  if (!shouldRender) {
    return (
      <View style={styles.loadingChartContainer}>
        <ActivityIndicator animating />
      </View>
    );
  }

  const data: ChartData[] = sortArray(
    product.prices
      .map((price) => {
        const currencyInfo = findCurrency(price.currencyId);
        const wage = wagesStore.findWage(price.currencyId);

        if (!currencyInfo || (!currencyInfo?.hourlyWage && !wage?.value)) {
          return null;
        }
        const hourlyWage = wage?.value || currencyInfo.hourlyWage;

        const newPrice: ChartData = {
          ...price,
          currencyInfo,
          hourlyWage,
          workingHours: parseFloat(calculateWorkingHours({ price, currencyInfo, wageValue: wage?.value })),
        };
        return newPrice;
      })
      .filter(notEmpty),
    { by: ['workingHours', 'id'], order: ['asc', 'desc'] },
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={[styles.chartOuterContainer, { backgroundColor: colors.background }]}>
      <ViewShot
        options={{ format: 'png', result: 'tmpfile' }}
        ref={viewShotRef}
        style={{ backgroundColor: colors.background }}
      >
        <Text style={styles.chartTitle}>
          {t('costOfProductByWorkingHours', { description: product.description })}
        </Text>

        <View style={styles.chartContainer}>
          <VictoryChart
            domainPadding={{ x: 16 }}
            height={150 + data.length * 25 + data.length * 10}
            theme={theme}
            width={dimensions.width}
          >
            <VictoryAxis
              style={{ grid: { strokeWidth: 0 } }}
              tickFormat={(tick: string) => data.find((e) => e.id === tick)!.currencyInfo.currency}
            />

            <VictoryAxis
              dependentAxis
              style={{ grid: { stroke: dark ? Colors.blueGrey700 : Colors.blueGrey200 } }}
              tickFormat={(tick: string) => `${tick}h`}
            />

            <VictoryBar
              barRatio={data.length === 1 ? 3 : undefined}
              data={data}
              horizontal
              labelComponent={
                <VictoryLabel
                  backgroundPadding={{ left: 8, right: -6, top: 2, bottom: 3 }}
                  backgroundStyle={
                    {
                      fillOpacity: 0.6,
                      fill: ({ datum, index }: any) =>
                        toMaterialStyle(String(datum.id) + String(index), dark ? 700 : 600).backgroundColor,
                    } as any
                  }
                  dy={-2}
                  textAnchor='start'
                  x={45}
                />
              }
              labels={({ datum }) => datum.workingHours}
              sortKey='workingHours'
              sortOrder='ascending'
              style={{
                // @ts-ignore
                labels: {
                  // @ts-ignore
                  fill: ({ datum, index }) =>
                    toMaterialStyle(String(datum.id) + String(index), dark ? 700 : 600).color,
                },
                data: {
                  fill: ({ datum, index }) =>
                    toMaterialStyle(String(datum.id) + String(index), dark ? 700 : 600).backgroundColor,
                },
              }}
              theme={VictoryTheme.material}
              x='id'
              y='workingHours'
            />
          </VictoryChart>
        </View>

        <View style={styles.footerContainer}>
          <Caption>{t('byAppName', { name: t('howMuch') })}</Caption>
          <Caption style={styles.dateText}>{formatDate(new Date())}</Caption>
        </View>

        <View style={styles.legendContainer}>
          {data.map((each, index) => {
            const { backgroundColor, color } = toMaterialStyle(each.id + String(index), dark ? 700 : 600);
            return (
              <Chip
                key={each.id}
                style={[styles.legendChip, { backgroundColor }]}
                textStyle={[styles.legendChipText, { color }]}
              >
                {t(`countryName.${stripCountryName(each.currencyInfo.countryName)}`, {
                  defaultValue: each.currencyInfo.countryName,
                })}
                {' • '}
                {toCurrency(each.value, each.currencyInfo.currency)}
                {' • '}
                {toCurrency(each.hourlyWage, each.currencyInfo.currency)}/{t('hr')}
              </Chip>
            );
          })}
        </View>
      </ViewShot>

      <View style={styles.chartButtonsContainer}>
        <FAB
          color={colors.textOnPrimary}
          icon='share-variant'
          onPress={handleSharePress}
          small
          style={styles.chartButton}
          theme={{ colors: { accent: colors.primary } }}
        />
        <FAB
          color={colors.textOnPrimary}
          icon='download'
          onPress={handleDownloadPress}
          small
          style={styles.chartButton}
          theme={{ colors: { accent: colors.primary } }}
        />
      </View>
    </View>
  );
});

export default PricesChart;
