import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Customer } from "../models/customer";
import { Answer } from "../models/answer";
import { AppConfig } from "../common/app_config";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private serviceRequestURL = AppConfig.prod_serviceRequestURL;
  private activateEmailURL = AppConfig.prod_activateEmailURL;
  private activateConfirmEmailURL = AppConfig.prod_activateConfirmEmailURL;
  private resendEmailURL = AppConfig.prod_resendEmailURL;
  private validateEmailURL = AppConfig.prod_validateEmailURL;
  private apiKey = AppConfig.prod_apiKey;

  private reachUsDB = AppConfig.prod_reachUsDB;
  private questionUrl = AppConfig.prod_questionURL;
  private questionFormUrl = AppConfig.prod_questionFormURL;

  constructor(private httpClient: HttpClient) {
    // Switch to use QA lambda funtions if not production
    //console.log("Url Host:", location.host);

    this.initialiseUrl();
  }

  private initialiseUrl() {
    //console.log("Run using production configuration");
    //console.log("PROD API KEY: ", AppConfig.prod_apiKey);
    //console.log("QA API KEY: ", AppConfig.qa_apiKey);

    if (environment.production) {
      // Temp solution: For QA and Staging
      if (!location.host.endsWith("cloudaz.com")) {
        //console.log("Swtich to QA/Staging profile if URL is not cloudaz.com");
        this.serviceRequestURL = AppConfig.qa_serviceRequestURL;
        this.activateEmailURL = AppConfig.qa_activateEmailURL;
        this.activateConfirmEmailURL = AppConfig.qa_activateConfirmEmailURL;
        this.resendEmailURL = AppConfig.qa_resendEmailURL;
        this.validateEmailURL = AppConfig.qa_validateEmailURL;
        this.questionUrl = AppConfig.qa_questionURL;
        this.questionFormUrl = AppConfig.qa_questionFormURL;
        this.apiKey = AppConfig.qa_apiKey;
      }
    }
  }

  public submitCustomerQueryAWS(record: any) {
    let date: Date = new Date();
    let dateInSec: number = date.getTime() / 1000;
    //params = params.append("registerDate", "" + dateInSec.toFixed());

    let jsonData = {
      sourceType: "cloudaz",
      phone: record.phone,
      message: record.message,
      name: record.name,
      email: record.email,
      company: record.company,
      registerDate: dateInSec.toFixed(),
    };

    let httpOptions = {
      headers: new HttpHeaders()
        .set("x-api-key", this.apiKey)
        .set("Content-Type", "application/json"),
    };

    return this.httpClient.post<any[]>(
      `${this.questionUrl}`,
      jsonData,
      httpOptions
    );
  }

  /**
   *
   * @param email
   */
  public validateEmail(email: string) {
    let httpOptions = {
      headers: new HttpHeaders().set("x-api-key", this.apiKey),
      params: new HttpParams().set("email", email),
    };

    //console.log("validateEmailUrl:", this.validateEmailURL);

    return this.httpClient.get<any[]>(`${this.validateEmailURL}`, httpOptions);
  }

  /**
   *
   * @param emailHash
   */
  public validateActivationCode(emailHash: string) {
    let httpOptions = {
      headers: new HttpHeaders().set("x-api-key", this.apiKey),
      params: new HttpParams().set("emailHash", emailHash),
    };

    //console.log("activateEmailURL", this.activateEmailURL);

    return this.httpClient.get<any[]>(`${this.activateEmailURL}`, httpOptions);
  }

  /**
   *
   * @param email
   */
  public confirmActivationCode(email: string) {
    let httpOptions = {
      headers: new HttpHeaders()
        .set("x-api-key", this.apiKey)
        .set("Content-Type", "application/json"),
    };

    let data = {
      email: email,
      emailActivation: "y",
    };

    let jsonData = JSON.stringify(data);
    //console.log("confirmActivationCode payload: ", jsonData);

    return this.httpClient.post(
      `${this.activateConfirmEmailURL}`,
      jsonData,
      httpOptions
    );
  }

  /**
   *
   * @param email
   */
  public resendEmail(email: string) {
    let httpOptions = {
      headers: new HttpHeaders().set("x-api-key", this.apiKey),
      params: new HttpParams().set("email", email),
    };

    //console.log("resendEmailURL:", this.resendEmailURL);

    return this.httpClient.get<any[]>(`${this.resendEmailURL}`, httpOptions);
  }

  /**
   *
   * @param customer
   */
  public signupCustomer(customer: Customer) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      }),
    };

    let jsonData = JSON.stringify(customer);

    //console.log("serviceRequestURL:", this.serviceRequestURL);

    return this.httpClient.post(
      `${this.serviceRequestURL}`,
      jsonData,
      httpOptions
    );
  }

  /**
   *
   * @param email
   */
  public getCustomerByEmail(email: string) {
    let params = {
      params: new HttpParams().set("email", email),
      headers: new HttpHeaders()
        .set("x-api-key", this.apiKey)
        .set("Content-Type", "application/json"),
    };

    return this.httpClient.get<Customer[]>(`${this.serviceRequestURL}`, params);
  }

  /**
   *
   * @param questions
   */
  public submitAnswer(record: Answer) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      }),
    };

    //return this.httpClient.get<any[]>(`${this.questionUrl}`, httpOptions);

    let jsonData = JSON.stringify(record);

    //console.log("API KEY:", this.apiKey);

    return this.httpClient.post(
      `${this.questionFormUrl}`,
      jsonData,
      httpOptions
    );
  }
}
