export const environment = {
  production: true,
  arrowhead: {
    host: 'http://137.204.57.93',
    port: 8443,
    harvester: 'emeritus-harvester-remote',
    networkWT: 'network-web-thing',
    services: ['gassensor', 'thingshub'],
  },
  paths: {
    gassensor: {
      name: 'Gas Sensor',
      description: 'Comercial Gas Sensor',
      havesterInput: 'gas-sensor-harvester-info',
      changeDuty: 'gas-sensor-dutycycle',
      duty: {
        min: 10,
        max: 50,
        step: 1,
      },
    },
    thingshub: {
      name: 'SHM Sensors',
      description: 'Sensors Monitoring the Structural Health of a Bridge',
      havesterInput: 'status',
      changeDuty: 'dutyCycle',
    },
  },
  cache: {
    durationInMinutes: 5,
    defaultKey: 'DEFAULT',
  },
  poolingTime: 15,
  fakeLifetime: false,
};
