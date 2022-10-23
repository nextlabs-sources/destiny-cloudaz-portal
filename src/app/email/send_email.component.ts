import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "../../environments/environment";

import { ApiService } from "../services/api.service";
import { GoogleAnalyticsService } from "../services/google-analytics.service";

@Component({
  selector: "send-email",
  templateUrl: "send_email.html",
  styleUrls: ["send_email.scss"],
})
export class SendEmailComponent implements OnInit, OnDestroy {
  showQuery = "true";
  showAck = "false";

  public emailForm: FormGroup;
  public contactNumber: string;
  public emailLink = "support@nextlabs.com";

  // Recaptcha
  public siteKey = "";
  public theme = "light"; // dark
  public size = "compact"; //normal
  public lang = "en";
  public type = "image";

  constructor(
    private apiService: ApiService,
    private gtagService: GoogleAnalyticsService
  ) {}

  public email_validation_messages = {
    name: [
      { type: "required", message: "Your name is required" },
      {
        type: "maxlength",
        message: "Your name cannot be more than 100 characters long",
      },
    ],
    email: [
      { type: "required", message: "Email is required" },
      {
        type: "maxlength",
        message: "Email cannot be more than 100 characters long",
      },
      { type: "pattern", message: "Enter a valid email" },
    ],
    phone: [
      { type: "required", message: "Phone number is required" },
      {
        type: "maxlength",
        message: "Phone number cannot be more than 20 characters long",
      },
      { type: "pattern", message: "Enter a valid phone number" },
    ],
    company: [
      { type: "required", message: "Company name is required" },
      {
        type: "maxlength",
        message: "Company name cannot be more than 100 characters long",
      },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long",
      },
    ],
    message: [
      { type: "required", message: "Message is required" },
      {
        type: "maxlength",
        message: "Message cannot be more than 3000 characters long",
      },
    ],
  };

  ngOnInit(): void {
    //console.log("SendEmailComponent initialised");
    this.siteKey = environment.googleReCaptchaKey;

    this.emailForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      company: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      message: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      recaptcha2: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    //console.log("SendEmailComponent destroyed");
  }

  public sendEmail = (emailFormValue) => {
    if (this.emailForm.invalid) {
      //console.log("Form has error");
      return;
    }

    // Submit the email content for processing
    //console.log("Send Email", emailFormValue);

    const contact = {
      name: emailFormValue["name"],
      company: emailFormValue["company"],
      email: emailFormValue["email"],
      phone: emailFormValue["phone"],
      message: emailFormValue["message"],
      status: "new",
    };

    this.gtagService.eventEmitter("Ask", "Question", "Ask a question");

    this.apiService.submitCustomerQueryAWS(contact).subscribe(
      (val) => {
        //console.log("Ask question success: ", val);
        this.showQuery = "false";
        this.showAck = "true";
      },
      (res) => {
        console.log("Ask question error: ", res);
      }
    );
  };

  closeAck(): void {
    this.showQuery = "true";
    this.showAck = "false";
  }

  handleReset(): void {
    //console.log("Handle Reset");
  }

  handleExpire(): void {
    //console.log("Handle Expire");
  }

  handleError(): void {
    //console.log("Handle Error");
  }

  handleLoad(): void {
    //console.log("Handle Load");
  }

  handleSuccess(captchaResponse: string): void {
    //console.log("Handle Success");
  }
}
