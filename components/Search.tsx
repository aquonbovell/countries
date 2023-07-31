"use client";

import React, { useState } from "react";
import { MaterialSymbolsSearch } from "./MaterialSymbolsSearch";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const name = e.target.value; // Get the value entered by the user
    updateSearch(name); // Call updateSearch with the current user input
  };

  const updateSearch = (name: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    name ? searchParams.set("name", name) : searchParams.delete("name");
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <form className="w-full py-5" onChange={handleSearch}>
      <label htmlFor="input" className="sr-only">
        Search for Country
      </label>
      <div className="relative">
        <MaterialSymbolsSearch className="absolute text-skin-input inset-y-0 my-auto inset-[1.5rem] scale-125" />
        <input
          className="w-full px-4 py-3 bg-skin-element text-skin-input shadow shadow-skin-shadow rounded-md pl-16"
          type="search"
          name="input"
          id="input"
          placeholder="Search for a country..."
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
