import { CountryModelSearchParams, CountryModelSummary } from "@/types";
import Country from "@/components/Country";
import Filter from "@/components/Filter";
import Link from "next/link";
import { fetchCountries } from "@/utils";
import Search from "@/components/Search";

export default async function Home({ searchParams }: CountryModelSearchParams) {
  const allCountries: any[] = await fetchCountries(
    {
      name: searchParams.name || "",
      region: searchParams.region || "",
    }
  );
  const isDataEmpty = !allCountries || allCountries.length < 1;

  return (
    <main className="px-4 py-2 container mx-auto">
      <div className="md:flex justify-between">
        <Search />
        <Filter />
      </div>
      <div className="grid grid-cols-resp  place-items-center gap-4 w-full ">
        {!isDataEmpty &&
          allCountries.map(
            ({
              name,
              population,
              region,
              capital,
              flag,
              alt,
            }: CountryModelSummary) => (
              <Link
                href={name}
                key={name}
                className="max-w-[231px] bg-skin-element overflow-hidden h-full cursor-pointer shadow-md shadow-skin-shadow"
              >
                <div className="">
                  <Country
                    name={name}
                    population={population}
                    region={region}
                    capital={capital}
                    flag={flag}
                    alt={alt}
                  />
                </div>
              </Link>
            )
          )}
        {isDataEmpty && (
          <div className="font-semibold text-xl">No Results, oops</div>
        )}
      </div>
    </main>
  );
}
