"use client";
import { useState } from "react";
import { FaGear, FaPlus, FaXmark } from "react-icons/fa6";
import { defaultGlobalOptions, defaultSolarSystem } from "../defaults";
import { OptionFields, Options } from "../options";
import AccordionItem from "./accordion";
import { InputField } from "./input-field";
import styles from "./nav.module.scss";
import { PlanetFields, PlanetProps } from "./planet";

export function PlanetForm({
  planet,
  index,
  border,
  onChange,
  onDelete,
}: {
  planet: Partial<PlanetProps>;
  index: number;
  border: boolean;
  onChange: (planet: Partial<PlanetProps>) => void;
  onDelete: (index: number) => void;
}) {
  const [localPlanet, setLocalPlanet] = useState<Partial<PlanetProps>>({
    ...planet,
  });
  const planetForm = Object.entries(PlanetFields).map(([key, value]) => {
    return (
      <InputField
        key={key + JSON.stringify(value.planetName)}
        value={
          value.type === "boolean"
            ? (localPlanet[key] as boolean)
            : (localPlanet[key] || "").toString()
        }
        fieldOptions={value}
        onChange={(e) => {
          if (value.type === "boolean") {
            const newData = {
              ...localPlanet,
              [key]: e.target.checked,
            };
            setLocalPlanet(newData);
            if (planet.isMoon) {
              onChange(newData);
            }
          } else if (value.type === "image") {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              const newData = {
                ...localPlanet,
                [key]: url,
              };
              setLocalPlanet(newData);
              if (planet.isMoon) {
                onChange(newData);
              }
            }
          } else {
            const newData = {
              ...localPlanet,
              [key]: Number(e.target.value),
            };
            setLocalPlanet(newData);
            if (planet.isMoon) {
              onChange(newData);
            }
          }
        }}
      />
    );
  });

  const moonForms =
    localPlanet.moons?.map((moon, index) => {
      return (
        <PlanetForm
          key={index + JSON.stringify(moon.planetName)}
          index={index}
          planet={moon}
          border={true}
          onChange={(newMoon: Partial<PlanetProps>) => {
            const newMoons = [...localPlanet.moons!];
            newMoons[index] = newMoon;
            setLocalPlanet({
              ...localPlanet,
              moons: newMoons,
            });
          }}
          onDelete={(index: number) => {
            const newMoons = [...localPlanet.moons!];
            newMoons.splice(index, 1);
            setLocalPlanet({
              ...localPlanet,
              moons: newMoons,
            });
            onChange(localPlanet);
          }}
        />
      );
    }) || [];
  const apply = planet.isMoon ? null : (
    <button
      className="btn btn-primary mt-2 w-full"
      onClick={() => onChange(localPlanet)}
    >
      Appliquer
    </button>
  );

  const moonsTitle = planet.isMoon ? null : (
    <div className={styles.title}>
      <span>Lunes</span>
      <button
        className="btn"
        onClick={() => {
          const name = Math.floor(Math.random() * (999 - 100 + 1) + 100);
          return setLocalPlanet({
            ...localPlanet,
            moons: [
              {
                planetName: "Lune-" + name,
                size: 4000,
                daysToOrbit: 100,
                daysToFullRotation: 100,
                distanceToCenter: 100000,
                reverseRotationDirection: false,
                isMoon: true,
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/220px-FullMoon2010.jpg",
              },
              ...(localPlanet.moons || []),
            ],
          });
        }}
      >
        <FaPlus size={24} />
      </button>
    </div>
  );

  return (
    <AccordionItem border={border} header={localPlanet.planetName}>
      {planetForm}
      {moonsTitle}
      {moonForms}
      {apply}
      <button
        className="btn btn-error mt-2 w-full"
        onClick={() => onDelete(index)}
      >
        Supprimer
      </button>
    </AccordionItem>
  );
}

export default function Navbar({
  visible,
  show,
  options,
  setOptions,
  solarSystem,
  setSolarSystem,
}: {
  visible: boolean;
  show: React.Dispatch<React.SetStateAction<boolean>>;
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  solarSystem: Partial<PlanetProps>[];
  setSolarSystem: React.Dispatch<React.SetStateAction<Partial<PlanetProps>[]>>;
}) {
  const [localOptions, setLocalOptions] = useState<Options>({ ...options });
  const planetForms = solarSystem.map((planet, index) => {
    return (
      <PlanetForm
        key={index + JSON.stringify(planet.planetName)}
        index={index}
        planet={planet}
        border={false}
        onChange={(newPlanet: Partial<PlanetProps>) => {
          const newSolarSystem = [...solarSystem];
          newSolarSystem[index] = newPlanet;
          setSolarSystem(newSolarSystem);
        }}
        onDelete={(index: number) => {
          const newSolarSystem = [...solarSystem];
          newSolarSystem.splice(index, 1);
          setSolarSystem(newSolarSystem);
        }}
      />
    );
  });
  const optionForm = Object.entries(OptionFields).map(([key, value]) => {
    return (
      <InputField
        key={key}
        value={
          value.type === "boolean"
            ? (localOptions[key] as boolean)
            : localOptions[key].toString()
        }
        fieldOptions={value}
        onChange={(e) => {
          if (value.type === "boolean") {
            setLocalOptions({
              ...localOptions,
              [key]: e.target.checked,
            });
          } else {
            setLocalOptions({
              ...localOptions,
              [key]: Number(e.target.value),
            });
          }
        }}
      />
    );
  });
  return (
    <>
      <nav
        className={
          !visible ? styles["nav"] + " " + styles["navbar"] : styles["nav"]
        }
      >
        <div className={styles.navContent}>
          <button
            type="button"
            className={styles["nav-btn"]}
            onClick={() => show(!visible)}
          >
            {!visible ? <FaGear size={30} /> : <FaXmark size={30} />}
          </button>
          <AccordionItem border={false} header="Options globales">
            {optionForm}
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={() => setOptions(localOptions)}
            >
              Appliquer
            </button>
            <button
              className="btn btn-warning mt-2 w-full"
              onClick={() => {
                setOptions(defaultGlobalOptions);
                setLocalOptions(defaultGlobalOptions);
              }}
            >
              Réinitialiser
            </button>
          </AccordionItem>
          <div className={styles.title}>
            <span>Planètes</span>
            <button
              className="btn btn-error"
              onClick={() => setSolarSystem([])}
            >
              Vider
            </button>
            <button
              className="btn btn-warning"
              onClick={() => setSolarSystem(defaultSolarSystem)}
            >
              Réinitialiser
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                const name = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                return setSolarSystem([
                  {
                    planetName: "Planette-" + name,
                    size: 100000,
                    daysToOrbit: 300,
                    daysToFullRotation: 1,
                    distanceToCenter: 500000000,
                    reverseRotationDirection: false,
                    image:
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/220px-The_Earth_seen_from_Apollo_17.jpg",
                  },
                  ...solarSystem,
                ]);
              }}
            >
              <FaPlus size={24} />
            </button>
          </div>
          {planetForms}
        </div>
      </nav>
    </>
  );
}
