"use client";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Filter() {
  const [selectedRegion, setSelectedRegion] = useState("Filter By Region");
  const router = useRouter();

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      const selected = new URLSearchParams(window.location.search);
      const regionParam = selected.get("region");
      if (regionParam !== null) {
        // Check if regionParam is not null
        setSelectedRegion(regionParam);
      }
    }
  }, []);
  const updateSearch = (name: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    name ? searchParams.set("region", name) : searchParams.delete("name");
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  };
  return (
    <div className="relative h-20 py-4 w-36 justify-end self-end md:self-center">
      <Listbox
        value={selectedRegion}
        onChange={(e) => {
          setSelectedRegion(e);
          updateSearch(e);
        }}
      >
        <Listbox.Button className="bg-skin-element p-3 font-semibold rounded-lg absolute left-0 md:left-[unset] md:right-0 w-max shadow shadow-skin-shadow">
          {selectedRegion}
        </Listbox.Button>
        <Listbox.Options className="absolute  top-[4.5rem] shadow  shadow-skin-shadow  bg-skin-element w-36 rounded-lg flex gap flex-col">
          {regions.map((region) => (
            <Listbox.Option
              key={region}
              value={region}
              className="px-3 py-1 font-semibold cursor-pointer hover:bg-skin-base"
            >
              {region}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
