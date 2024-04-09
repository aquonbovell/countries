export interface Country {
  // name: string;
  name: {
    common: string;
    official: string;

    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  nativeName: string;
  topLevelDomain: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: [
    {
      iso639_1: string;
      iso639_2: string;
      name: string;
      nativeName: string;
    }
  ];
  translations: {
    [languageCode: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: {
    [year: string]: number;
  };
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
    postalCode: {
      format: string;
      regex: string;
    };
  };
}

export interface CResponse {
  countries: Country[];
  country: Country;
}

export const SelectCountryModelSummary = {
  name: "",
  population: "",
  region: "",
  capital: "",
  flags: "",
};

export interface CountryModelSummary {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
  alt: string;
}

export const SelectCountryModelDetail = {
  name: "",
  population: "",
  region: "",
  subregion: "",
  capital: "",
  flags: "",
  tld: "",
  currencies: "",
  languages: "",
  borders: "",
};

export interface CountryModelDetail {
  name: string;
  nativename?: string;
  population: number;
  region: string;
  subregion?: string;
  capital: string[];
  flag: string;
  alt: string;
  tld?: string;
  currencies?: string[];
  languages?: string[];
  borders?: string[];
}

export interface CountryModelFilters {
  name: string;
  region?: string;
}

export interface CountryModelFiltersParams {
  params: {
    country: string;
  };
}

export interface CountryModelSearchParams {
  searchParams: {
    name: string;
    region: string;
  };
}
