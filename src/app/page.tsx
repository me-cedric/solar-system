"use client";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./page.module.scss";

const defaultSolarSystem: PlanetProps[] = [
  {
    name: "Mercure",
    size: 4880,
    daysToOrbit: 87.97,
    daysToFullRotation: 59,
    distanceToCenter: 58000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/220px-Mercury_in_color_-_Prockter07-edit1.jpg",
  },
  {
    name: "Venus",
    size: 12100,
    daysToOrbit: 224.7,
    daysToFullRotation: 243,
    distanceToCenter: 108000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/220px-Venus-real_color.jpg",
  },
  {
    name: "Earth",
    size: 12800,
    daysToOrbit: 365.26,
    daysToFullRotation: 1,
    distanceToCenter: 150000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/220px-The_Earth_seen_from_Apollo_17.jpg",
    moons: [
      {
        name: "Lune",
        size: 3475,
        daysToOrbit: 27.3,
        daysToFullRotation: 27.3,
        distanceToCenter: 384400,
        reverseRotationDirection: false,
        isMoon: true,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/220px-FullMoon2010.jpg",
      },
    ],
  },
  {
    name: "Mars",
    size: 6800,
    daysToOrbit: 686.98,
    daysToFullRotation: 1.02,
    distanceToCenter: 228000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/220px-OSIRIS_Mars_true_color.jpg",
  },
  {
    name: "Jupiter",
    size: 142000,
    daysToOrbit: 4332,
    daysToFullRotation: 0.42,
    distanceToCenter: 778000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Jupiter_detail_voyager2.jpg",
  },
  {
    name: "Saturne",
    size: 120000,
    daysToOrbit: 10761,
    daysToFullRotation: 0.44,
    distanceToCenter: 1430000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Saturn_-_HST_2019-06-20_full_size.jpg/220px-Saturn_-_HST_2019-06-20_full_size.jpg",
  },
  {
    name: "Uranus",
    size: 51800,
    daysToOrbit: 30685,
    daysToFullRotation: 0.72,
    distanceToCenter: 2870000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/220px-Uranus2.jpg",
  },
  {
    name: "Neptune",
    size: 49500,
    daysToOrbit: 60191,
    daysToFullRotation: 0.67,
    distanceToCenter: 4500000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/220px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
  },
];

const sunSize: number = 5; // rem
const sunActualSizeKm: number = 1400000; // 1.4M km
const earthRotationLength: number = 4.1; // 4.1s for 365d TODO editable later
const earthRotationDays: number = 365;
const earthRotationDuration: number = 1; // days
const durationOfDay: number = 1; // seconds
const rotationOn: boolean = false; // seconds
const planetScale: number = 10;
const scale: number = 0.003;
const moonScale: number = 30;
const orbitScale: number = 5;

class PlanetProps {
  name!: string;
  size!: number;
  daysToOrbit!: number;
  daysToFullRotation!: number;
  distanceToCenter!: number;
  reverseRotationDirection!: boolean;
  image!: string;
  isMoon?: boolean = false;
  parentBaseSize?: number = 0;
  parentSize?: number = 0;
  parentActualSize?: number = 0;
  moons?: PlanetProps[];
}

function Planet(props: Readonly<PlanetProps>) {
  const planetSize =
    ((props.parentSize || 1) / (props.parentActualSize || 1)) *
    props.size *
    planetScale;
  const planetRotationLength =
    (earthRotationLength / earthRotationDays) * props.daysToOrbit * orbitScale;
  const planetRotationDuration =
    (earthRotationDuration / durationOfDay) * props.daysToFullRotation;
  const planetDistanceToCenter =
    (props.parentBaseSize || 1) / 2 +
    ((props.parentSize || 1) / (props.parentActualSize || 1)) *
      props.distanceToCenter *
      scale *
      (props.isMoon || false ? moonScale : 1);

  const planetOrbitStyle: React.CSSProperties = {
    width: `${planetDistanceToCenter * 2}rem`,
    height: `${planetDistanceToCenter * 2}rem`,
    animation: `movement ${planetRotationLength}s linear infinite`,
    left: props.isMoon
      ? `calc(calc(${props.parentSize}rem - ${planetDistanceToCenter}rem) - 1px)`
      : `calc(var(--sun-left) - ${planetDistanceToCenter}rem)`,
    top: props.isMoon
      ? `calc(calc(50% - ${planetDistanceToCenter}rem) - 1px)`
      : `calc(var(--sun-top) - ${planetDistanceToCenter}rem)`,
  };
  const planetContentStyle: React.CSSProperties = {
    width: `${planetSize}rem`,
    height: `${planetSize}rem`,
    backgroundImage: `url(${props.image})`,
    top: `calc(calc(50% - ${planetSize / 2}rem) - 1px)`,
    left: `calc(-${planetSize / 2}rem - 1px)`,
    animation: rotationOn
      ? `movement ${planetRotationDuration}s linear infinite`
      : undefined,
    animationDirection: rotationOn
      ? props.reverseRotationDirection
        ? "reverse"
        : "normal"
      : undefined,
  };

  const moons = planetMapper(
    props.moons || [],
    ((props.parentSize || 1) / (props.parentActualSize || 1)) * props.size,
    planetSize,
    props.size
  );
  return (
    <div className={styles.planet} style={planetOrbitStyle} title={props.name}>
      {moons}
      <div className={styles.planetimage} style={planetContentStyle}></div>
    </div>
  );
}

const planetMapper = (
  planets: PlanetProps[],
  parentSize: number,
  parentBaseSize: number,
  parentActualSize: number
) =>
  planets
    ?.sort(
      // Furthest await displayed first
      (planetA, planetB) => planetB.distanceToCenter - planetA.distanceToCenter
    )
    ?.map((planet) => (
      <Planet
        key={planet.name}
        name={planet.name}
        size={planet.size}
        daysToOrbit={planet.daysToOrbit}
        daysToFullRotation={planet.daysToFullRotation}
        reverseRotationDirection={planet.reverseRotationDirection}
        distanceToCenter={planet.distanceToCenter}
        parentSize={parentSize}
        parentActualSize={parentActualSize}
        parentBaseSize={parentBaseSize}
        image={planet.image}
        isMoon={planet.isMoon}
        moons={planet.moons}
      />
    )) || [];

const Stars = dynamic(() => import("./components/stars"), { ssr: false });

export default function Home() {
  const planets = planetMapper(
    defaultSolarSystem,
    sunSize,
    sunSize,
    sunActualSizeKm
  );
  return (
    <>
      <Stars></Stars>
      <div className={styles.system}>
        <div className={styles.sun}></div>
        {planets}
      </div>
    </>
  );
}
