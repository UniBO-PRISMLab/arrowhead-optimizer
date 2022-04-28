export interface IDrHarvesterInput {
  devId: string;
  harvId: string;
  lowpwrI: number;
  activeI: number;
  duty: number;
  Vload: number;
  devAvgI: number | null;
  batSOC: number | null;
  batV: number;
  phIrr: number;
  thThot: number | null;
  thTcold: number | null;
  thGrad: number | null;
  vibAcc: number | null;
  vibFreq: number | null;
  id?: string;
}

export class DrHarvesterInput implements IDrHarvesterInput {
  devId = 'GasSensor';
  harvId = 'SolarLightLoad';

  lowpwrI = 400;
  activeI = 715;
  duty = 20;
  Vload = 5;
  devAvgI = null;
  batSOC = null;
  batV = 3.75;

  phIrr = 700;
  thThot = null;
  thTcold = null;
  thGrad = null;
  vibAcc = null;
  vibFreq = null;

  constructor(input: IDrHarvesterInput) {
    this.devId = input.devId;
    this.harvId = input.harvId;
    this.lowpwrI = input.lowpwrI;
    this.activeI = input.activeI;
    this.Vload = input.Vload;
    this.batV = input.batV;
    this.phIrr = input.phIrr;
    this.duty = input.duty;
  }
}

export enum DrHarvesterSelector {
  devId = 'devId',
  harvId = 'harvId',
  lowpwrI = 'lowpwrI',
  activeI = 'activeI',
  duty = 'duty',
  Vload = 'Vload',
  devAvgI = 'devAvgI',
  batSOC = 'batSOC',
  batV = 'batV',
  phIrr = 'phIrr',
  thTcold = 'thTcold',
  thThot = 'thThot',
  thGrad = 'thGrad',
  vibAcc = 'vibAcc',
  vibFreq = 'vibFreq',
}
