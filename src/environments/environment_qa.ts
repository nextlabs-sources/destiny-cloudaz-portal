// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  googleReCaptchaKey: "6LdUE58UAAAAAKnun1zUkf_qHuB4g4be4yp-oxFR",
  cloudazConsoleUrl: "/console",
  cloudazAdPart1URL: "/cas/clientredirect?client_name=azure&service=",
  //cloudazAdPart2URL: "/console/login/cas",
  cloudazAdPart2URL: "/",
  apiKey: "TpeV2y2OSR32iM5xihaex8vaf1N747bh2dDD9T3c",
  serviceURL: "https://c5tnb3yan0.execute-api.us-west-2.amazonaws.com",
  activateEmailUrl: "/Staging/query",
  activateConfirmEmailUrl: "/Staging/activate",
  serviceRequestURL: "/Staging/form",
  resendEmailUrl: "/Staging/resend-validation-email",
  validateEmailUrl: "/Staging/account-check",

  reachUsDatabase: "cloudaz_reach_us",
  questionAPI:
    "https://2f3wqcje0l.execute-api.us-west-2.amazonaws.com/Prod/ask-question",
  questionFormAPI:
    "https://hp0r829fr0.execute-api.us-west-2.amazonaws.com/Prod/questionnaire-form",
  //questionFormUrl:"https://f08e5fa4.ngrok.io/soc/Prod/questionnaire-form",
  //questionApiKey: "o22TwTum1OaEuMy4WdpOb364qETg5h9uaJXwKhWq",  qa_apiKey: "TpeV2y2OSR32iM5xihaex8vaf1N747bh2dDD9T3c",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
