import { IArrowheadServiceRegistry } from "./arrowheadServiceRegistry.model";


export class ArrowheadServiceRegistry implements IArrowheadServiceRegistry {
  id: number = 0;
  serviceDefinition = {
    id: 0,
    serviceDefinition: '',
    createdAt: '', //date
    updatedAt: '', //date
  };
  provider = {
    id: 0,
    systemName: '',
    address: '',
    port: 0,
    createdAt: '', //date
    updatedAt: '', //date
  };
  serviceUri: string = '';
  secure: string = '';
  version: number = 0;
  interfaces = [
    {
      id: 0,
      interfaceName: '',
      createdAt: '', //date
      updatedAt: '', //date
    },
  ];
  createdAt: string = ''; //date
  updatedAt: string = ''; //date
}

