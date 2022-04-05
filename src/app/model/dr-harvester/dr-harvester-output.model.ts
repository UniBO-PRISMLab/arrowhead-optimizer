export interface IDrHarvesterOutput {
  terminated: boolean;
  result: {
    devId: string;
    harvId: string;
    batState: number;
    batlifeh: number;
    tChargeh: number;
    dSOCrate: number;
    date: string;
    simStatus: number;
  } | null;
}

export interface IDrHarvesterJob {
  jobId: string;
}


export class DrHarvesterOutput implements IDrHarvesterOutput{
  terminated = false;
  result = null;
}
