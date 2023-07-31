"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { MaterialSymbolsDarkModeOutlineRounded } from "../components/MaterialSymbolsDarkModeOutlineRounded";
import { useEffect, useState } from "react";

const nunitoSans = Nunito_Sans({
  weight: ["300", "600", "800", "300"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    const darkMode = JSON.parse(String(localStorage.getItem("darkMode")));

    if (!darkMode) {
      setMode(false);
    } else {
      setMode(true);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${nunitoSans.className} text-base transition-colors ${
          !mode ? "" : "dark"
        } text-skin-base bg-skin-base`}
      >
        <header className="w-full shadow-md shadow-skin-shadow">
          <section className="container px-4 flex justify-between py-6 mx-auto">
            <p className="font-extrabold text-lg">Where in the World?</p>
            <div className="inline-flex gap-2 font-semibold items-center">
              <MaterialSymbolsDarkModeOutlineRounded
                handleClick={() => {
                  setMode(!mode);
                  if (mode === true) {
                    localStorage.setItem("darkMode", JSON.stringify("false"));
                  } else {
                    localStorage.setItem("darkMode", JSON.stringify("true"));
                  }
                }}
              />
              <span>{!mode ? "Dark Mode" : "Light Mode"}</span>
            </div>
          </section>
        </header>
        {children}
      </body>
    </html>
  );
}
