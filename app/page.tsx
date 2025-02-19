"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import { planetMapper, PlanetProps } from "./components/planet";
import { defaultGlobalOptions, defaultSolarSystem } from "./defaults";
import { Options } from "./options";
import styles from "./page.module.scss";

const Stars = dynamic(() => import("./components/stars"), { ssr: false });

export default function Home() {
  const [navVisible, showNavbar] = useState(false);
  const [options, setOptions] = useState<Options>(defaultGlobalOptions);
  const [solarSystem, setSolarSystem] =
    useState<Partial<PlanetProps>[]>(defaultSolarSystem);
  const planets = planetMapper(
    solarSystem,
    options,
    options.sunSize,
    options.sunSize,
    options.sunActualSizeKm
  );
  return (
    <>
      <Stars></Stars>
      <div className={styles.system}>
        <div className={styles.sun}></div>
        {planets}
      </div>
      <Navbar
        visible={navVisible}
        show={showNavbar}
        options={options}
        setOptions={setOptions}
        solarSystem={solarSystem}
        setSolarSystem={setSolarSystem}
      />
    </>
  );
}
