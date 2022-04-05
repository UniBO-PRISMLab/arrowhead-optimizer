export interface IArrowheadServiceRegistry {
  id: number;
  serviceDefinition: {
    id: number;
    serviceDefinition: string;
    createdAt: string; //date
    updatedAt: string; //date
  };
  provider: {
    id: number;
    systemName: string;
    address: string;
    port: number;
    createdAt: string; //date
    updatedAt: string; //date
  };
  serviceUri: string;
  secure: string;
  version: number;
  interfaces: {
    id: number;
    interfaceName: string;
    createdAt: string; //date
    updatedAt: string; //date
  }[];
  createdAt: string; //date
  updatedAt: string; //date
}
