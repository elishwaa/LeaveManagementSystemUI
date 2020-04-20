// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'https://localhost:44398/api/',
  production: false,
  authConfig: {
    tenant: 'bf3fb9cd-ad82-45ee-bdbe-ae6176997c7c',
    clientId: '53f2a03b-145b-403a-804c-dc98a85b5d2e',
    endpoints: {
      'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000'
    }}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
