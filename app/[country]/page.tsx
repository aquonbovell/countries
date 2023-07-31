import { MaterialSymbolsArrowLeftAltRounded } from "@/components/MaterialSymbolsArrowLeftAltRounded";
import { CountryDetailProps, CountryHomeProps } from "@/types";
import { fetchCountries } from "@/utils";
import Link from "next/link";

export default async function CountryPage({ params }) {
  // Your logic to fetch data for the specific country using the 'country' variable

  const allCountries: CountryDetailProps[] = await fetchCountries(
    {
      name: params.country || "",
    },
    true
  );
  const currencies = [];
  for (const key in allCountries[0].currencies) {
    if (Object.prototype.hasOwnProperty.call(allCountries[0].currencies, key)) {
      const element = allCountries[0].currencies[key];
      currencies.push(element.name);
    }
  }
  const languages = [];
  for (const key in allCountries[0].languages) {
    if (Object.prototype.hasOwnProperty.call(allCountries[0].languages, key)) {
      const element = allCountries[0].languages[key];
      languages.push(element);
    }
  }
  return (
    <div className="container px-4 py-7 w-full mx-auto">
      <Link
        href="/"
        className=" inline-flex items-center gap-2 bg-skin-element px-4 py-1 shadow shadow-skin-shadow"
      >
        <MaterialSymbolsArrowLeftAltRounded /> Back
      </Link>
      <div className="py-8 sm:grid sm:grid-cols-2 sm:gap-8">
        <img src={allCountries[0].flag} />
        <div className="">
          <h2 className="font-bold py-5 sm:text-xl sm:py-3">
            {allCountries[0].name}
          </h2>
          <div className="sm:grid sm:grid-cols-2">
            <div>
              <p className="font-semibold py-1">
                Native Name:{" "}
                <span className="font-normal">
                  {allCountries[0].nativeName}
                </span>
              </p>
              <p className="font-semibold py-1">
                Population:{" "}
                <span className="font-normal">
                  {allCountries[0].population}
                </span>
              </p>
              <p className="font-semibold py-1">
                Region:{" "}
                <span className="font-normal">{allCountries[0].region}</span>
              </p>
              <p className="font-semibold py-1">
                Sub Region:{" "}
                <span className="font-normal">{allCountries[0].subregion}</span>
              </p>
              <p className="font-semibold py-1">
                Capital:{" "}
                <span className="font-normal">{allCountries[0].capital}</span>
              </p>
            </div>
            <div className=" pt-6 sm:pt-0">
              <p className=" font-semibold py-1">
                Top Level Domain:{" "}
                <span className="font-normal">
                  {allCountries[0].topLevelDomain}
                </span>
              </p>
              <p className=" font-semibold py-1">
                Currencies:{" "}
                <div className="inline-flex">
                  {currencies.map((curr) => (
                    <span className="font-normal" key={curr}>
                      {curr}
                    </span>
                  ))}
                </div>
              </p>
              <p className=" font-semibold py-1">
                Languages:{" "}
                <div className="inline-flex gap-1">
                  {languages.map((curr) => (
                    <span className="font-normal" key={curr}>
                      {curr},
                    </span>
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
