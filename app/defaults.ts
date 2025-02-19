import { PlanetProps } from "./components/planet";
import { Options } from "./options";

export const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/220px-The_Earth_seen_from_Apollo_17.jpg";

export const defaultGlobalOptions: Options = {
  sunSize: 5, // rem
  sunActualSizeKm: 1400000, // 1.4M km
  earthRotationLength: 4.1, // 4.1s for 365d TODO editable later
  earthRotationDays: 365,
  earthRotationDuration: 1, // days
  durationOfDay: 1, // seconds
  rotationOn: false, // seconds
  planetScale: 10,
  scale: 0.003,
  moonScale: 30,
  orbitScale: 5,
};

export const defaultSolarSystem: Partial<PlanetProps>[] = [
  {
    planetName: "Mercure",
    size: 4880,
    daysToOrbit: 87.97,
    daysToFullRotation: 59,
    distanceToCenter: 58000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/220px-Mercury_in_color_-_Prockter07-edit1.jpg",
  },
  {
    planetName: "Venus",
    size: 12100,
    daysToOrbit: 224.7,
    daysToFullRotation: 243,
    distanceToCenter: 108000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/220px-Venus-real_color.jpg",
  },
  {
    planetName: "Terre",
    size: 12800,
    daysToOrbit: 365.26,
    daysToFullRotation: 1,
    distanceToCenter: 150000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/220px-The_Earth_seen_from_Apollo_17.jpg",
    moons: [
      {
        planetName: "Lune",
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
    planetName: "Mars",
    size: 6800,
    daysToOrbit: 686.98,
    daysToFullRotation: 1.02,
    distanceToCenter: 228000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/220px-OSIRIS_Mars_true_color.jpg",
  },
  {
    planetName: "Jupiter",
    size: 142000,
    daysToOrbit: 4332,
    daysToFullRotation: 0.42,
    distanceToCenter: 778000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Jupiter_detail_voyager2.jpg",
  },
  {
    planetName: "Saturne",
    size: 120000,
    daysToOrbit: 10761,
    daysToFullRotation: 0.44,
    distanceToCenter: 1430000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Saturn_-_HST_2019-06-20_full_size.jpg/220px-Saturn_-_HST_2019-06-20_full_size.jpg",
  },
  {
    planetName: "Uranus",
    size: 51800,
    daysToOrbit: 30685,
    daysToFullRotation: 0.72,
    distanceToCenter: 2870000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/220px-Uranus2.jpg",
  },
  {
    planetName: "Neptune",
    size: 49500,
    daysToOrbit: 60191,
    daysToFullRotation: 0.67,
    distanceToCenter: 4500000000,
    reverseRotationDirection: false,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/220px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
  },
];
