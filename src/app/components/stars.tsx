"use client";
import { useEffect, useState } from "react";
import styles from "./stars.module.scss";

interface IProps {
  name: string;
  [key: string]: React.CSSProperties | string;
}

const Keyframes = (props: IProps) => {
  const toCss = (cssObject: React.CSSProperties | string) =>
    typeof cssObject === "string"
      ? cssObject
      : Object.keys(cssObject).reduce((accumulator, key) => {
          const cssKey = key.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cssValue = (cssObject as any)[key].toString().replace("'", "");
          return `${accumulator}${cssKey}:${cssValue};`;
        }, "");

  return (
    <style>
      {`@keyframes ${props.name} {
        ${Object.keys(props)
          .map((key) => {
            return ["from", "to"].includes(key)
              ? `${key} { ${toCss(props[key])} }`
              : /^_[0-9]+$/.test(key)
              ? `${key.replace("_", "")}% { ${toCss(props[key])} }`
              : "";
          })
          .join(" ")}
      }`}
    </style>
  );
};

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

export function useStars() {
  const getStyles = () => {
    const { height, width } = getWindowDimensions();
    const reference = width > height ? width : height;
    const starStyle: React.CSSProperties = {
      boxShadow:
        `${random(reference * 2)}px ${random(reference * 2)}px #FFF` +
        [...Array(1400)]
          .map(
            () =>
              ` , ${random(reference * 2)}px ${random(reference * 2)}px #FFF`
          )
          .join(""),
      animation: "animStar 100s linear infinite",
    };
    const starStyle2: React.CSSProperties = {
      boxShadow:
        `${random(reference * 2)}px ${random(reference * 2)}px #FFF` +
        [...Array(400)]
          .map(
            () =>
              ` , ${random(reference * 2)}px ${random(reference * 2)}px #FFF`
          )
          .join(""),
      animation: "animStar 200s linear infinite",
    };
    const starStyle3: React.CSSProperties = {
      boxShadow:
        `${random(reference * 2)}px ${random(reference * 2)}px #FFF` +
        [...Array(200)]
          .map(
            () =>
              ` , ${random(reference * 2)}px ${random(reference * 2)}px #FFF`
          )
          .join(""),
      animation: "animStar 300s linear infinite",
    };
    return {
      starStyle,
      starStyle2,
      starStyle3,
      transform: `translateY(-${reference * 2}px)`,
    };
  };
  const [stars, setStars] = useState(getStyles());

  useEffect(() => {
    function handleResize() {
      setStars(getStyles());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return stars;
}

function random(max: number) {
  return Math.floor(Math.random() * max);
}

export default function Stars() {
  const { starStyle, starStyle2, starStyle3, transform } = useStars();
  return (
    <>
      <Keyframes
        name="animStar"
        from={{ transform: "translateY(0px)" }}
        to={{ transform }}
      />
      <div className={styles.stars} style={starStyle}></div>
      <div className={styles.stars2} style={starStyle2}></div>
      <div className={styles.stars3} style={starStyle3}></div>
    </>
  );
}
