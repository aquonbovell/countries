export interface CountryHomeProps {
  name: string;
  population: string;
  region: string;
  capital: string;
  flag: string;
  alt: string;
}
export interface CountryDetailProps {
  nativeName: string;
  population: string;
  region: string;
  subRegion: string;
  capital: string;
  flag: string;
}

export const SelectCountryDetailProps = {
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

export const SelectProps = {
  name: "",
  population: "",
  region: "",
  capital: "",
  flags: "",
};

export interface FilterProps {
  name: string;
  region?: string;
}
