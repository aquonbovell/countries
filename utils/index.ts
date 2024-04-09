import { CountryModelFilters } from "@/types";

export async function fetchCountries(
  filters: CountryModelFilters
): Promise<any[]> {
  try {
    const response: Response = await fetch(
      "https://countries-api-addd.onrender.com/api/countries/all"
    );
    const result: any = await response.json();
    const countries: any[] = [];
    result.countries
      .filter((country: any) => {
        return (
          country.name.common
            .toLowerCase()
            .includes(filters.name.toLowerCase()) &&
          (!filters.region ||
            country.region.toLowerCase().includes(filters.region.toLowerCase()))
        );
      })
      .forEach((country: any) => {
        countries.push({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital,
          flag: country.flags.png,
          alt: country.flags?.alt || country.name.common,
        });
      });
    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCountry(filters: CountryModelFilters): Promise<any> {
  try {
    const response: Response = await fetch(
      `https://countries-api-addd.onrender.com/api/countries/single/${filters.name}`
    );
    const result: any = await response.json();
    const country = {
      name: result.country.name.common,
      population: result.country.population,
      region: result.country.region,
      subregion: result.country.subregion,
      capital: result.country.capital,
      flag: result.country.flags.png,
      alt: result.country.flags.alt,
      tld: result.country.tld,
      currencies: result.country.currencies,
      languages: result.country.languages,
      borders: result.country.borders,
    };
    return country;
  } catch (error) {
    console.log(error);
    return [];
  }
}
