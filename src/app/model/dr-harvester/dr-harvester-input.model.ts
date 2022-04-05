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
}

export class DrHarvesterInput implements IDrHarvesterInput {
  devId = 'GasSensor';
  harvId = 'SolarLightLoad';

  lowpwrI = 1;
  activeI = 20;
  duty = 20;
  Vload = 3.3;
  devAvgI = null;
  batSOC = null;
  batV = 3.82;

  phIrr = 700;
  thThot = null;
  thTcold = null;
  thGrad = null;
  vibAcc = null;
  vibFreq = null;
}
