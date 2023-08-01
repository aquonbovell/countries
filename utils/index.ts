import {
  Country,
  CountryModelDetail,
  CountryModelFilters,
  CountryModelSummary,
  SelectCountryModelDetail,
  SelectCountryModelSummary,
} from "@/types";

export async function fetchCountries(
  filters: CountryModelFilters,
  detailed: boolean
): Promise<(CountryModelDetail | CountryModelSummary)[]> {
  try {
    const response: Response = detailed
      ? await fetch(
          `https://restcountries.com/v3.1/name/${
            filters.name.toLowerCase().charAt(0).toUpperCase() +
            filters.name.toLowerCase().slice(1)
          }?fields=${Object.keys(SelectCountryModelDetail).join(",")}`
        )
      : await fetch(
          `https://restcountries.com/v3.1/all?fields=${Object.keys(
            SelectCountryModelSummary
          ).join(",")}`
        );
    const result: Country[] = await response.json();
    console.log(result);
    const countries: CountryModelSummary[] | CountryModelDetail[] = [];
    detailed
      ? result.forEach(
          ({
            name,
            population,
            region,
            subregion,
            capital,
            flags,
            tld,
            currencies,
            languages,
            borders,
          }: Country) => {
            const country: CountryModelDetail = {
              name: name.common,
              nativename:
                name.nativeName[Object.keys(name.nativeName)[0]].official,
              population: population,
              region: region,
              subregion: subregion,
              capital: capital,
              flag: flags.svg,
              alt: flags.alt || `The flag of ${name.common}`,
              tld: tld[0],
              currencies: Object.values(currencies).map((currency) => {
                return currency.name;
              }),
              languages: Object.values(languages),
              borders: borders,
            };
            countries.push(country);
          }
        )
      : result
          .filter(({ name, region }: Country) => {
            return (
              name.common.toLowerCase().includes(filters.name.toLowerCase()) &&
              (!filters.region ||
                region.toLowerCase().includes(filters.region.toLowerCase()))
            );
          })
          .forEach(({ name, population, region, capital, flags }: Country) => {
            const country: CountryModelSummary = {
              name: name.common,
              population: population,
              region: region,
              capital: capital,
              flag: flags.svg,
              alt: flags.alt || `The flag of ${name.common}`,
            };
            countries.push(country);
          });

    return countries.sort((country1, country2) =>
      country1.name.localeCompare(country2.name)
    );

    // const result: CountrySummaryProps[] | CountryDetailProps[] =
    //   await response.json();
    // return detail
    //   ? result.map(
    //       ({
    //         name,
    //         population,
    //         region,
    //         subregion,
    //         capital,
    //         flags,
    //         tld,
    //         currencies,
    //         languages,
    //         borders,
    //       }: CountryDetailProps) => {
    //         return {
    //           name: name.common,
    //           nativename:
    //             name.nativeName[Object.keys(name.nativeName)[0]].official,
    //           population: population,
    //           region: region,
    //           subregion: subregion,
    //           capital: capital,
    //           flag: flags.svg,
    //           alt: flags.alt || `The flag of ${name.common}`,
    //           topLevelDomain: tld[0],
    //           currencies: Object.values(currencies).map((currency) => {
    //             return currency.name;
    //           }),
    //           languages: Object.values(languages),
    //           borders: borders,
    //         };
    //       }
    //     )
    //   : result
    //       .filter(({ name, region }: CountrySummaryProps) => {
    //         return (
    //           name.common.toLowerCase().includes(filters.name.toLowerCase()) &&
    //           (!filters.region ||
    //             region.toLowerCase().includes(filters.region.toLowerCase()))
    //         );
    //       })
    //       .map(
    //         ({
    //           name,
    //           population,
    //           region,
    //           capital,
    //           flags,
    //         }: CountrySummaryProps) => {
    //           return {
    //             name: name.common,
    //             population: population,
    //             region: region,
    //             capital: capital,
    //             flag: flags.svg,
    //             alt: flags.alt || `The flag of ${name.common}`,
    //           };
    //         }
    //       )
    //       .sort((country1, country2) =>
    //         country1.name.localeCompare(country2.name)
    //       );
  } catch (error) {
    console.log(error);

    return [];
  }
}
