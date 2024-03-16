import {
  CResponse,
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
          `https://countries-api-addd.onrender.com/api/countries/single/${
            filters.name.toLowerCase().charAt(0).toUpperCase() +
            filters.name.slice(1)
          }`
        )
      : await fetch(
          `https://countries-api-addd.onrender.com/api/countries/all?limit=1000`
        );
    const result: CResponse = await response.json();
    const countries: (CountryModelDetail | CountryModelSummary)[] = [];
    detailed
      ? countries.push(
          await {
            name: result.country.name,
            nativename: result.country.nativeName,
            population: result.country.population,
            region: result.country.region,
            subregion: result.country.subregion,
            capital: result.country.capital,
            flag: result.country.flag,
            alt: `The flag of ${result.country.name}`,
            tld: result.country.topLevelDomain[0],
            currencies: Object.values(result.country.currencies).map(
              (currency) => {
                return currency.name;
              }
            ),
            languages: result.country.languages.map((language) => {
              return language.name;
            }),
            borders: result.country.borders,
          }
        )
      : result.countries
          .filter(({ name, region }: Country) => {
            return (
              name.toLowerCase().includes(filters.name.toLowerCase()) &&
              (!filters.region ||
                region.toLowerCase().includes(filters.region.toLowerCase()))
            );
          })
          .forEach(({ name, population, region, capital, flag }: Country) => {
            const country: CountryModelSummary = {
              name: name,
              population: population,
              region: region,
              capital: capital,
              flag: flag,
              alt: `The flag of ${name}`,
            };
            countries.push(country);
          });

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
}
