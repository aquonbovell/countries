import { MaterialSymbolsArrowLeftAltRounded } from "@/components/MaterialSymbolsArrowLeftAltRounded";
import { CountryModelFiltersParams } from "@/types";
import { fetchCountry } from "@/utils";
import Link from "next/link";

export default async function CountryPage({
  params,
}: CountryModelFiltersParams) {
  const country: any = await fetchCountry({
    name: params.country || "",
  });
  return (
    <div className="container px-4 py-7 w-full mx-auto">
      <Link
        href="/"
        className=" inline-flex items-center gap-2 bg-skin-element px-4 py-1 shadow shadow-skin-shadow"
      >
        <MaterialSymbolsArrowLeftAltRounded /> Back
      </Link>
      <div className="py-8 sm:grid sm:grid-cols-2 sm:gap-8">
        <img src={country.flag} />
        <div className="">
          <h2 className="font-bold py-5 sm:text-xl sm:py-3">{country.name}</h2>
          <div className="sm:grid sm:grid-cols-2">
            <div>
              <p className="font-semibold py-1">
                Native Name:{" "}
                <span className="font-normal">{country.nativename}</span>
              </p>
              <p className="font-semibold py-1">
                Population:{" "}
                <span className="font-normal">{country.population}</span>
              </p>
              <p className="font-semibold py-1">
                Region: <span className="font-normal">{country.region}</span>
              </p>
              <p className="font-semibold py-1">
                Sub Region:{" "}
                <span className="font-normal">{country.subregion}</span>
              </p>
              <p className="font-semibold py-1">
                Capital: <span className="font-normal">{country.capital}</span>
              </p>
            </div>
            <div className=" pt-6 sm:pt-0">
              <p className=" font-semibold py-1">
                Top Level Domain:{" "}
                <span className="font-normal">{country.tld}</span>
              </p>
              <p className=" font-semibold py-1">
                Currencies:{" "}
                <div className="inline-flex">
                  {country.currencies.length >0 && Object.values(country.currencies).map((curr: any) => (
                    <span className="font-normal" key={curr.name}>
                      {curr.name}
                    </span>
                  ))}
                </div>
              </p>
              <p className=" font-semibold py-1">
                Languages:{" "}
                <div className="inline-flex gap-1 flex-wrap">
                  {country.languages.length1 > 0 &&
                    Object.values(country.languages).map(
                      (lang: any, index: any) => (
                        <span className="font-normal" key={index}>
                          {lang}
                        </span>
                      )
                    )}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
