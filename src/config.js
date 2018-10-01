import ViewList from './components/view-list';
import ViewTiles from './components/view-tiles';
import ViewComparison from './components/view-comparison';

export const config = {
  defaultLang: 'pl',
  defaultView: 'list',
  imgUrl: 'http://michalb3.webd.pro/phone-finder',
  api: 'http://michalb3.webd.pro/phone-finder/api',
};

export const views = {
  list: ViewList,
  tiles: ViewTiles,
  comparison: ViewComparison,
};

export const languages = {
  pl: { // #1
    ajaxLoader: {
      alt: 'Ładowanie...',
    },
    checkboxGroup: {
      os: {
        label: 'System operacyjny',
      },
      resolution: {
        label: 'Rozdzielczość ekranu',
      },
      switcher: {
        false: 'Więcej',
        true: 'Mniej',
      },
    },
    code: 'pl',
    cookieInfo: {
      close: 'Zamknij',
      text: 'Ta strona korzysta z ciasteczek w celu ustawienia preferencji wyświetlanych treści.',
    },
    error: 'Wystąpił błąd podczas próby pobrania zasobów.',
    form: {
      reset: 'Resetuj',
    },
    nav: {
      lang: {
        en: 'English',
        pl: 'Polski',
      },
      view: {
        comparison: 'Porównaj',
        list: 'Lista',
        tiles: 'Kafelki',
      },
    },
    pagination: {
      next: 'Następna',
      page: 'Strona',
      prev: 'Poprzednia',
    },
    parameterNames: {
      battery: 'Pojemność baterii',
      cpu: 'Procesor',
      diagonal: 'Przekątna ekranu',
      memory: 'Pamięć wewnętrzna',
      name: 'Nazwa modelu',
      os: 'System operacyjny',
      ram: 'Pamięć RAM',
      resolution: 'Rozdzielczość ekranu',
    },
    parameters: {
      empty: 'Brak danych',
    },
    resultInfo: {
      getResult: function(number) {
        if (!isNaN(number)) {
          if (1 === number) {
            return 'Znaleziono 1 wynik.';
          } else if(1 < number && 5 > number) {
            return `Znaleziono ${ number } wyniki.`;
          } else if(5 <= number) {
            return `Znaleziono ${ number } wyników.`;
          } else {
            return 'Nie znaleziono wyników.';
          }
        }
      },
    },
    search: {
      label: 'Nazwa modelu',
      placeholder: 'Szukaj...',
    },
    slider: {
      battery: {
        label: 'Pojemność baterii',
      },
      cpu: {
        label: 'Procesor',
      },
      diagonal: {
        label: 'Przekątna ekranu',
      },
      memory: {
        label: 'Pamięć wewnętrzna',
      },
      ram: {
        label: 'Pamięć RAM',
      },
    },
    sorting: {
      label: 'Sortuj wg.',
      orderBy: {
        asc: 'Rosnąco',
        desc: 'Malejąco',
      },
    },
    title: 'Wyszukiwarka telefonów',
    units: {
      battery: 'mAh',
      cpu: 'MHz',
      diagonal: '"',
      memory: 'GB',
      os: '',
      ram: 'MB',
      resolution: '',
    },
    view: {
      compare: {
        false: 'Porównaj',
        true: 'Nie porównuj',
      },
      notFound: 'Widok nie istnieje.',
      tooltip: 'Możliwe porównanie maksymalnie trzech pozycji.',
    },
    viewComparison: {
      difference: {
        false: 'Pokaż różnice',
        true: 'Ukryj różnice',
      },
      empty: 'Brak danych',
    },
  },
  en: { // #2
    ajaxLoader: {
      alt: 'Loading...',
    },
    checkboxGroup: {
      os: {
        label: 'Operating system',
      },
      resolution: {
        label: 'Screen resolution',
      },
      switcher: {
        false: 'More',
        true: 'Less',
      },
    },
    code: 'en',
    cookieInfo: {
      close: 'Close',
      text: 'This website uses cookies for setting look preferences.',
    },
    error: 'Error when attempting to fetch resources.',
    form: {
      reset: 'Reset',
    },
    nav: {
      lang: {
        en: 'English',
        pl: 'Polski',
      },
      view: {
        comparison: 'Compare',
        list: 'List',
        tiles: 'Tiles',
      },
    },
    pagination: {
      next: 'Next',
      page: 'Page',
      prev: 'Previous',
    },
    parameterNames: {
      battery: 'Battery capacity',
      cpu: 'Processor',
      diagonal: 'Screen diagonal',
      memory: 'Internal storage',
      name: 'Model name',
      os: 'Operating system',
      ram: 'RAM memory',
      resolution: 'Screen resolution',
    },
    parameters: {
      empty: 'No data',
    },
    resultInfo: {
      getResult: function(number) {
        if(!isNaN(number)) {
          if(1 === number) {
            return 'Found 1 result.';
          } else if(1 < number) {
            return `Found ${ number } results.`;
          } else {
            return 'No results found.';
          }
        }
      },
    },
    search: {
      label: 'Model name',
      placeholder: 'Search...',
    },
    slider: {
      battery: {
        label: 'Battery capacity',
      },
      cpu: {
        label: 'Processor',
      },
      diagonal: {
        label: 'Screen diagonal',
      },
      memory: {
        label: 'Internal storage',
      },
      ram: {
        label: 'RAM memory',
      },
    },
    sorting: {
      label: 'Sort by',
      orderBy: {
        asc: 'Ascending',
        desc: 'Descending',
      },
    },
    title: 'Phone finder',
    units: {
      battery: 'mAh',
      cpu: 'MHz',
      diagonal: '"',
      memory: 'GB',
      os: '',
      ram: 'MB',
      resolution: '',
    },
    view: {
      compare: {
        false: 'Compare',
        true: 'No compare',
      },
      notFound: 'The view doesn\'t exist.',
      tooltip: 'Possible compare max three items.',
    },
    viewComparison: {
      difference: {
        false: 'Show differences',
        true: 'Hide differences',
      },
      empty: 'No data',
    },
  },
};
