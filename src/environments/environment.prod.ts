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
      description: 'comercial gas sensor',
      havesterInput: 'gas-sensor-harvester-info',
      changeDuty: 'gas-sensor-dutycycle',
      duty: {
        min: 10,
        max: 33,
        step: 1,
      },
    },
    thingshub: {
      name: 'SHM Sensors',
      description: 'sensors monitoring the structural health of a bridge',
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
