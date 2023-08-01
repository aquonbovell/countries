import { ExtendedCountrySummaryProps } from "@/types";
import React from "react";

export default function Country({
  name,
  population,
  region,
  capital,
  flag,
  alt,
}: ExtendedCountrySummaryProps) {
  return (
    <>
      <img
        className="max-w-sm mx-auto aspect-video h-[130px] object-cover "
        src={flag}
        alt={alt}
      />
      <div className=" p-4">
        <h2 className=" font-extrabold text-lg py-3">{name}</h2>
        <p className=" capitalize">population: {population}</p>
        <p className="capitalize">region: {region}</p>
        <p className="capitalize">capital: {capital}</p>
      </div>
    </>
  );
}
