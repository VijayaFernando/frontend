// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    tenant: "a2296216-c1de-49eb-8ba6-c02cbaf26c0a",
    clientId: "7fa501bd-a1d7-4d4b-9672-539ef7aa4870",
    endpoints: {
      "https://graph.microsoft.com": "00000003-0000-0000-c000-000000000000",
    },
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
