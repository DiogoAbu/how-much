/* eslint-disable @typescript-eslint/naming-convention */

const translation = {
  byHowMuch: 'By: How Much App',

  howMuch: 'How much?',
  newProduct: 'New product',
  editingProduct: 'Editing product',
  preferences: 'Preferences',
  countriesWages: 'Countries wages',
  editingWage: 'Editing wage',

  pickACurrency: 'Pick a currency',
  preferredCurrency: 'Preferred currency',
  lookForAcurrency: 'Look for a currency',
  activeCurrency: 'Active currency',
  availableCurrencies: 'Available currencies',
  noActiveCurrency: 'No active currency',
  pickPreferredCurrencyBelow: 'Pick preferred currency below',

  draftFound: 'Draft found',
  doYouWantToDiscardThisDraftOrEditIt: 'Do you want to discard this draft or edit it',
  nothingHereYet: 'Nothing here yet',
  noPriceForPreferredCurrency: 'No price for preferred currency',
  toStartUsingThisAppYouNeedToPickYourPreferredCurrency:
    'To start using this app you need to pick your preferred currency.',
  dontWorryYouCanChangeItLater: 'Don`t worry you can change it later!',
  areYouSure: 'Are you sure?',
  doYouWantToDeleteThisProduct: 'Do you want to delete this product?',
  costOfProductByWorkingHours: 'Cost of {{description}} by working hours',
  accessToGaleryDenied: 'Access to galery denied',
  contentNotLoadedTryAgain: 'Content not loaded, please try again.',
  sharingUnavailable: 'Sharing unavailable on this device.',
  somethingWentWrong: 'Something went wrong!',
  saveInGallery: 'Save in gallery?',
  doYouWantToSaveThisChartIntoYourGallery: 'Do you want to save this chart into your gallery?',
  chartImageSavedInGallery: 'Chart image saved in gallery',

  description: 'Description',
  price: 'Price',
  prices: 'Prices',
  currency: 'Currency',
  country: 'Country',
  hourlyWageValue: 'Hourly wage value',

  descriptionCannotBeEmpty: 'Description cannot be empty',
  needsAtLeastOnePrice: 'Needs at least one price',
  noResults: 'No results',
  unknown: 'Unknown',
  noValidPrice: 'No valid price',

  title: {
    welcome: 'Welcome',
    oops: 'Oops',
  },

  label: {
    yes: 'Yes',
    no: 'No',
    ok: 'Ok',
    return: 'Return',
    discard: 'Discard',
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete',
    done: 'Done',
    addCurrency: 'Add currency',
    sort: 'Sort',
    alphabetically: 'Alphabetically',
    date: 'Date',
    ascending: 'ascending',
    descending: 'descending',
  },

  hr: 'hr',

  colorScheme: 'Color scheme',
  colorScheme_auto: 'Auto',
  colorScheme_dark: 'Dark',
  colorScheme_light: 'Light',

  time: {
    formats: {
      default: '%a, %d %b %Y %H:%M:%S %z',
      long: '%B %d, %Y %H:%M',
      short: '%d %b %H:%M',
    },
  },

  date: {
    formats: {
      default: '%Y-%m-%d', // 2015-06-25
      long: '%B %d, %Y', // June 25, 2015
      short: '%b %d', // Jun 25
    },

    day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    abbr_day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    month_names: [
      null,
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    abbr_month_names: [
      null,
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    meridian: ['am', 'pm'],
  },
};

export default translation;
