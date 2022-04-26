// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  arrowhead: {
    host: 'http://137.204.57.93',
    port: 8443,
    harvester: 'emeritus-harvester',
    networkWT: 'network-web-thing',
    services: ['gassensor', 'gassensor'],
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
    thingsHub: {
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
