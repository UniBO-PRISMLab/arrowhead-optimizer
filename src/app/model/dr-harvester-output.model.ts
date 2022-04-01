export interface DrHarvesterOutput {
  terminated: true;
  result: {
    devId: 'string';
    harvId: 'string';
    batState: number;
    batlifeh: number;
    tChargeh: number;
    dSOCrate: number;
    date: 'string';
    simStatus: number;
  };
}
