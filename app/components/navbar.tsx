"use client";
import { useState } from "react";
import { FaGear, FaPlus, FaXmark } from "react-icons/fa6";
import { defaultGlobalOptions } from "../defaults";
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
        key={key}
        value={
          value.type === "boolean"
            ? (localPlanet[key] as boolean)
            : (localPlanet[key] || "").toString()
        }
        fieldOptions={value}
        onChange={(e) => {
          if (value.type === "boolean") {
            setLocalPlanet({
              ...localPlanet,
              [key]: e.target.checked,
            });
            if (planet.isMoon) {
              onChange({
                ...localPlanet,
                [key]: e.target.checked,
              });
            }
          } else {
            setLocalPlanet({
              ...localPlanet,
              [key]: Number(e.target.value),
            });
            if (planet.isMoon) {
              onChange({
                ...localPlanet,
                [key]: Number(e.target.value),
              });
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
          key={index}
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

  return (
    <AccordionItem border={border} header={localPlanet.planetName} margin={2}>
      {planetForm}
      <p>Lunes</p>
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
        key={index}
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
              className="btn btn-info mt-2 w-full"
              onClick={() => {
                setOptions(defaultGlobalOptions);
                setLocalOptions(defaultGlobalOptions);
              }}
            >
              Reinitialiser
            </button>
          </AccordionItem>
          <div className={styles.title}>
            <span>Planètes</span>
            <button className="btn">
              <FaPlus size={24} />
            </button>
          </div>
          {planetForms}
        </div>
      </nav>
    </>
  );
}
