import { environment } from 'src/environments/environment';

export class AppConfig {

  // Production
  public static prod_serviceURL = environment.serviceURL;
  public static prod_serviceRequestURL = AppConfig.prod_serviceURL + environment.serviceRequestURL;
  public static prod_activateEmailURL = AppConfig.prod_serviceURL + environment.activateEmailUrl;
  public static prod_activateConfirmEmailURL = AppConfig.prod_serviceURL + environment.activateConfirmEmailUrl;
  public static prod_resendEmailURL = AppConfig.prod_serviceURL + environment.resendEmailUrl;
  public static prod_validateEmailURL = AppConfig.prod_serviceURL + environment.validateEmailUrl;
  public static prod_apiKey = environment.apiKey;

  public static prod_reachUsDB = environment.reachUsDatabase;
  public static prod_questionURL = environment.questionAPI;
  public static prod_questionFormURL = environment.questionFormAPI;

  // QA
  public static qa_serviceURL = environment.qa_serviceURL;
  public static qa_serviceRequestURL = AppConfig.qa_serviceURL + environment.qa_serviceRequestURL;
  public static qa_activateEmailURL = AppConfig.qa_serviceURL + environment.qa_activateEmailUrl;
  public static qa_activateConfirmEmailURL = AppConfig.qa_serviceURL + environment.qa_activateConfirmEmailUrl;
  public static qa_resendEmailURL = AppConfig.qa_serviceURL + environment.qa_resendEmailUrl;
  public static qa_validateEmailURL = AppConfig.qa_serviceURL + environment.qa_validateEmailUrl;
  public static qa_questionURL = AppConfig.qa_serviceURL + environment.qa_questionAPI;
  public static qa_questionFormURL = environment.qa_questionFormAPI;
  public static qa_apiKey = environment.qa_apiKey;

  public static qa_reachUsDB = environment.reachUsDatabase;


}