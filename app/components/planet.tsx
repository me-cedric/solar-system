import { defaultImage } from "../defaults";
import { FieldOptions, Options } from "../options";
import styles from "./planet.module.scss";

export class PlanetProps {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Options
    | Partial<PlanetProps>[];
  planetName!: string;
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
  options!: Options;
  moons?: Partial<PlanetProps>[];
}

export class PlanetFields {
  static planetName: FieldOptions = {
    type: "string",
    label: "Nom de la planette",
  };
  static size: FieldOptions = {
    type: "number",
    label: "Diamètre (en km)",
    min: 1000,
    step: 1000,
  };
  static daysToOrbit: FieldOptions = {
    type: "number",
    label: "Durée de l'orbit autour du réferentiel (en jour)",
    min: 1,
    step: 1,
  };
  static daysToFullRotation: FieldOptions = {
    type: "number",
    label: "Durée de l'orbit sur elle même (en jour)",
    min: 1,
    step: 0.01,
  };
  static distanceToCenter: FieldOptions = {
    type: "number",
    label: "Distance du réferentiel (en km)",
    min: 1000,
    step: 1000,
  };
  static reverseRotationDirection: FieldOptions = {
    type: "boolean",
    label: "Inverser le sens de rotation",
  };
  static image: FieldOptions = {
    type: "image",
    label: "Image",
  };
}

export default function Planet(props: Readonly<PlanetProps>) {
  const planetSize =
    ((props.parentSize || 1) / (props.parentActualSize || 1)) *
    props.size *
    props.options.planetScale;
  const planetRotationLength =
    (props.options.earthRotationLength / props.options.earthRotationDays) *
    props.daysToOrbit *
    props.options.orbitScale;
  const planetRotationDuration =
    (props.options.earthRotationDuration / props.options.durationOfDay) *
    props.daysToFullRotation;
  const planetDistanceToCenter =
    (props.parentBaseSize || 1) / 2 +
    ((props.parentSize || 1) / (props.parentActualSize || 1)) *
      props.distanceToCenter *
      props.options.scale *
      (props.isMoon || false ? props.options.moonScale : 1);

  const planetOrbitStyle: React.CSSProperties = {
    width: props.isMoon
      ? `calc(${planetDistanceToCenter * 2}rem + 0.25rem)`
      : `calc(${planetDistanceToCenter * 2}rem)`,
    height: props.isMoon
      ? `calc(${planetDistanceToCenter * 2}rem + 0.25rem)`
      : `calc(${planetDistanceToCenter * 2}rem)`,
    animation:
      `movement ${planetRotationLength}s linear infinite ` +
      (props.reverseRotationDirection ? "reverse" : "normal"),
    left: props.isMoon
      ? `calc(-${planetDistanceToCenter}rem - 0.125rem)`
      : `calc(var(--sun-left) - ${planetDistanceToCenter}rem)`,
    top: props.isMoon
      ? `calc(50% - ${planetDistanceToCenter}rem - 0.125rem)`
      : `calc(var(--sun-top) - ${planetDistanceToCenter}rem)`,
  };
  const planetContentStyle: React.CSSProperties = {
    width: `${planetSize}rem`,
    height: `${planetSize}rem`,
    backgroundImage: `url(${props.image})`,
    top: `calc(50% - ${planetSize / 2}rem)`,
    left: `calc(-${planetSize / 2}rem)`,
    animation: props.options.rotationOn
      ? `movement ${planetRotationDuration}s linear infinite`
      : undefined,
  };

  const moons = planetMapper(
    props.moons || [],
    props.options,
    ((props.parentSize || 1) / (props.parentActualSize || 1)) * props.size,
    planetSize,
    props.size
  );
  return (
    <div
      className={styles.planet}
      style={planetOrbitStyle}
      title={props.planetName}
    >
      <div className={styles.planetimage} style={planetContentStyle}></div>
      {moons}
    </div>
  );
}

export const planetMapper = (
  planets: Partial<PlanetProps>[],
  options: Options,
  parentSize: number,
  parentBaseSize: number,
  parentActualSize: number
) =>
  planets
    ?.sort(
      // Furthest await displayed first
      (planetA, planetB) =>
        (planetB.distanceToCenter || 0) - (planetA.distanceToCenter || 0)
    )
    ?.map((planet) => (
      <Planet
        key={planet.planetName}
        planetName={planet.planetName || "Unknown"}
        size={planet.size || 0}
        daysToOrbit={planet.daysToOrbit || options.earthRotationDays}
        daysToFullRotation={
          planet.daysToFullRotation || options.earthRotationDuration
        }
        reverseRotationDirection={planet.reverseRotationDirection || false}
        distanceToCenter={planet.distanceToCenter || options.sunActualSizeKm}
        parentSize={parentSize}
        parentActualSize={parentActualSize}
        parentBaseSize={parentBaseSize}
        image={planet.image || defaultImage}
        isMoon={planet.isMoon}
        moons={planet.moons}
        options={options}
      />
    )) || [];
