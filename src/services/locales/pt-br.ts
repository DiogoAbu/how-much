/* eslint-disable @typescript-eslint/naming-convention */

const translation = {
  byHowMuch: 'Por: Quanto Custa App',

  howMuch: 'Quanto Custa?',
  newProduct: 'Novo produto',
  editingProduct: 'Editar produto',
  preferences: 'Preferências',
  countriesWages: 'Remuneração de países',
  editingWage: 'Editar remuneração',

  pickACurrency: 'Escolha uma moeda',
  preferredCurrency: 'Moeda preferida',
  lookForAcurrency: 'Procurar moeda',
  activeCurrency: 'Moeda ativa',
  availableCurrencies: 'Moedas disponíveis',
  noActiveCurrency: 'Sem moeda ativa',
  pickPreferredCurrencyBelow: 'Escolher sua moeda preferida',

  draftFound: 'Rascunho encontrado',
  doYouWantToDiscardThisDraftOrEditIt: 'Você quer descartar este rascunho ou editá-lo?',
  nothingHereYet: 'Nada para mostrar',
  noPriceForPreferredCurrency: 'Sem preço para moeda ativa',
  toStartUsingThisAppYouNeedToPickYourPreferredCurrency:
    'Para começar a usar o app, você deve escolhar sua moeda preferida',
  dontWorryYouCanChangeItLater: 'Não se preocupe você pode mudar depois!',
  areYouSure: 'Tem certeza?',
  doYouWantToDeleteThisProduct: 'Deseja deletar este produto?',
  costOfProductByWorkingHours: 'Custo de {{description}} por horas trabalhadas',
  accessToGaleryDenied: 'Acesso a galeria recusado',
  contentNotLoadedTryAgain: 'Conteúdo não carregou, tente novamente.',
  sharingUnavailable: 'Compartilhamento indisponível nesse dispositivo.',
  somethingWentWrong: 'Algo deu errado!',
  saveInGallery: 'Salvar na galeria?',
  doYouWantToSaveThisChartIntoYourGallery: 'Deseja salvar este gráfico na sua galleria?',
  chartImageSavedInGallery: 'Imagem do gráfico salvo na galeria',

  description: 'Descrição',
  price: 'Preço',
  prices: 'Preços',
  currency: 'Moeda',
  country: 'País',
  hourlyWageValue: 'Valor de remuneração por hora',

  descriptionCannotBeEmpty: 'Descrição não pode estar vazia',
  needsAtLeastOnePrice: 'Precisa de ao menos um preço',
  noResults: 'Sem resultados',
  unknown: 'Desconhecido',
  noValidPrice: 'Sem preço válido',

  title: {
    welcome: 'Bem-vindo',
    oops: 'Oops',
  },

  label: {
    yes: 'Sim',
    no: 'Não',
    ok: 'Ok',
    return: 'Retornar',
    discard: 'Descartar',
    edit: 'Editar',
    duplicate: 'Duplicar',
    delete: 'Deletar',
    done: 'Feito',
    addCurrency: 'Adicionar moeda',
    sort: 'Ordernar',
    alphabetically: 'Alfabeticamente',
    date: 'Data',
    ascending: 'ascendendo',
    descending: 'descendendo',
  },

  hr: 'hr',

  colorScheme: 'Esquema de cores',
  colorScheme_auto: 'Auto',
  colorScheme_dark: 'Escuro',
  colorScheme_light: 'Claro',

  number: {
    currency: {
      format: {
        delimiter: '.',
        format: '%u %n',
        precision: 2,
        separator: ',',
        significant: false,
        strip_insignificant_zeros: false,
        unit: '',
      },
    },
    format: {
      delimiter: '.',
      precision: 3,
      separator: ',',
      significant: false,
      strip_insignificant_zeros: false,
    },
  },

  time: {
    formats: {
      default: '%a, %d de %B de %Y, %H:%M:%S %z',
      long: '%d de %B de %Y, %H:%M',
      short: '%d de %B, %H:%M',
    },
  },

  date: {
    formats: {
      default: '%d/%m/%Y', // 25-06-2015
      long: '%d de %B de %Y', // 25 de Junho de 2015
      short: '%d de %B', // 25 de Junho
    },

    day_names: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    abbr_day_names: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    month_names: [
      null,
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    abbr_month_names: [
      null,
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    meridian: ['am', 'pm'],
  },
};

export default translation;
