export class Options {
  [key: string]: number | boolean;
  sunSize!: number;
  sunActualSizeKm!: number;
  earthRotationLength!: number;
  earthRotationDays!: number;
  earthRotationDuration!: number;
  durationOfDay!: number;
  rotationOn!: boolean;
  planetScale!: number;
  scale!: number;
  moonScale!: number;
  orbitScale!: number;
}

export class OptionFields {
  static sunSize: FieldOptions = {
    type: "number",
    label: "Taille du soleil sur la page (en rem)",
    min: 0.1,
    step: 0.1,
  };
  static sunActualSizeKm: FieldOptions = {
    type: "number",
    label: "Diamètre du soleil (en km)",
    min: 1000,
    step: 1000,
  };
  static earthRotationLength: FieldOptions = {
    type: "number",
    label:
      "Durée de l'orbit de la terre autour du soleil (temps réel en seconde pour equivalent de la durée en jour)",
    min: 1,
    step: 0.1,
  };
  static earthRotationDays: FieldOptions = {
    type: "number",
    label: "Durée de l'orbit de la terre autour du soleil (en jour)",
    min: 1,
    step: 1,
  };
  static earthRotationDuration: FieldOptions = {
    type: "number",
    label: "Durée de l'orbit sur elle même (en jour)",
    min: 1,
    step: 1,
  };
  static durationOfDay: FieldOptions = {
    type: "number",
    label: "Durée de l'orbit sur elle même (temps réel en seconde)",
    min: 1,
    step: 0.1,
  };
  static rotationOn: FieldOptions = {
    type: "boolean",
    label: "Orbit sur elle même activée",
  };
  static planetScale: FieldOptions = {
    type: "number",
    label: "Échelle des planètes (taille x echelle)",
    min: 1,
    step: 0.1,
  };
  static scale: FieldOptions = {
    type: "number",
    label: "Échelle des distances (distance x echelle)",
    min: 0.001,
    step: 0.001,
  };
  static moonScale: FieldOptions = {
    type: "number",
    label: "Échelle des lunes (taille x echelle)",
    min: 1,
    step: 0.1,
  };
  static orbitScale: FieldOptions = {
    type: "number",
    label: "Échelle des distances des lunes (distance x echelle)",
    min: 0.001,
    step: 0.001,
  };
}

export class FieldOptions {
  type!: string;
  label!: string;
  min?: number;
  max?: number;
  step?: number;
}
