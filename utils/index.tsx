import {
  CountryDetailProps,
  CountryHomeProps,
  FilterProps,
  SelectCountryDetailProps,
  SelectProps,
} from "@/types";

export async function fetchCountries(filters: FilterProps, detail: boolean) {
  try {
    const response = detail
      ? await fetch(
          `https://restcountries.com/v3.1/name/${
            filters.name.toLowerCase().charAt(0).toUpperCase() +
            filters.name.toLowerCase().slice(1)
          }?fields=${Object.keys(SelectCountryDetailProps).join(",")}`
          // all?fields=${Object.keys(
          //  SelectCountryDetailProps
          // ).join(",")}`
        )
      : await fetch(
          `https://restcountries.com/v3.1/all?fields=${Object.keys(
            SelectProps
          ).join(",")}`
        );
    const result = await response.json();
    // console.log(result);
    return detail
      ? Array.from(result).map((country: CountryDetailProps) => {
          return {
            name: country.name.common,
            nativeName:
              country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                .common,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital,
            flag: country.flags.svg,
            alt: country.flags.alt,
            topLevelDomain: country.tld[0],
            currencies: country.currencies,
            languages: country.languages,
            borders: country.borders,
          };
        })
      : Array.from(result)
          .filter((country: CountryHomeProps) => {
            return (
              country.name.common
                .toLowerCase()
                .includes(filters.name.toLowerCase()) &&
              country.region
                .toLowerCase()
                .includes(filters.region.toLowerCase())
            );
          })
          .map((country) => {
            return {
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital,
              flag: country.flags.svg,
              alt: country.flags.alt,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.log(error);
    return [];
  }
}
