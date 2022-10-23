import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

import { ApiService } from "../services/api.service";
import { Customer } from "../models/customer";
import { GoogleAnalyticsService } from "../services/google-analytics.service";

export interface EmployeeSize {
  value: string;
  viewValue: string;
}

@Component({
  selector: "signup",
  templateUrl: "signup.html",
  styleUrls: ["signup.scss"],
})
export class SignupComponent implements OnInit, OnDestroy {
  sub: Subscription;
  sub2: Subscription;

  public signupForm: FormGroup;

  public contactNumber = "010";
  public emailLink = "support@nextlabs.com";

  public showPage1 = true;
  public showPage2 = false;

  // Recaptcha
  public siteKey = "";
  public theme = "light"; // dark
  public size = "compact"; //normal
  public lang = "en";
  public type = "image";

  private customerObservable: Observable<any[]>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private gtagService: GoogleAnalyticsService
  ) {}

  public signup_validation_messages = {
    firstName: [
      { type: "required", message: "First Name is required" },
      {
        type: "maxlength",
        message: "First Name cannot be more than 100 characters long",
      },
    ],
    lastName: [
      { type: "required", message: "Last Name is required" },
      {
        type: "maxlength",
        message: "Last Name cannot be more than 100 characters long",
      },
    ],
    email: [
      { type: "required", message: "Work email is required" },
      {
        type: "maxlength",
        message: "Work email cannot be more than 100 characters long",
      },
      {
        type: "commonDomain",
        message:
          "Register with your work email. Public email services are not allowed.",
      },
      {
        type: "inUse",
        message: "An account with this email has already been registered",
      },
      {
        type: "notVerified",
        message:
          "An account with this email has already been registered but has not been" +
          " verified. Resend verification email",
      },
      {
        type: "pendingApproval",
        message:
          "Your request is pending. If you have any questions, " +
          " please email us at " +
          this.emailLink +
          " or call at " +
          this.contactNumber,
      },
      {
        type: "trialExpired",
        message:
          "Your trial has expired. If you have any questions, please email us at " +
          this.emailLink +
          " or call at " +
          this.contactNumber,
      },
      {
        type: "isAdmin",
        message:
          "This is a reserved email. Please register with another email address",
      },
      { type: "pattern", message: "Enter a valid email" },
    ],
    phone: [
      {
        type: "maxlength",
        message: "Phone number cannot be more than 100 characters long",
      },
      { type: "pattern", message: "Enter a valid phone number" },
    ],
    notes: [
      {
        type: "maxlength",
        message: "Notes cannot be more than 3000 characters long",
      },
    ],
    company: [
      {
        type: "maxlength",
        message: "Company name cannot be more than 100 characters long",
      },
      { type: "pattern", message: "Enter a valid company name" },
    ],
  };

  ngOnInit(): void {
    //console.log("SignupComponent initialised");
    this.siteKey = environment.googleReCaptchaKey;

    this.signupForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      company: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl(""),
      notes: new FormControl("", [Validators.maxLength(3000)]),
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),

      recaptcha: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy() {
    //console.log("SignupComponent destroyed");
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  public nextPage() {
    // Submit the email content for processing
    //console.log("Open Next Page");
    this.showPage1 = false;
    this.showPage2 = true;
  }

  public previousPage() {
    // Submit the email content for processing
    //console.log("Open Previous Page");

    this.showPage1 = true;
    this.showPage2 = false;
  }

  public sendSignup = (formValue) => {
    // Submit the email content for processing

    if (this.signupForm.invalid) {
      //console.log("Form has error");
      return;
    }

    const customer = new Customer();

    customer.registerDate = new Date();
    customer.firstName = formValue.firstName;
    customer.lastName = formValue.lastName;
    customer.company = formValue.company;
    const inputEmail: string = formValue.email;
    customer.email = inputEmail.toLowerCase();
    customer.phone = formValue.phone;
    if (customer.phone == null || customer.phone == "") {
      customer.phone = "-";
    }
    customer.notes = formValue.notes;
    if (customer.notes == null) {
      customer.notes = "-";
    }

    this.sub = this.apiService.validateEmail(customer.email).subscribe(
      (val) => {
        //console.log("[Email Check] Received data", val);

        // val[] = "success" or "exist"
        if (val[0] == "s") {
          //console.log("Email not registered");
          this.signupCustomer(customer);
        } else {
          //console.log("Email has registered");
          this.signupForm.get("email").setErrors({
            inUse: true,
          });
        }
      },
      (res) => {
        console.log("[Email Check Failed]Received response", res);
      }
    );
  };

  private signupCustomer(customer: Customer) {
    this.gtagService.eventEmitter("Signup", "cloudAz", "Signup for Free Trial");

    this.sub = this.apiService.signupCustomer(customer).subscribe(
      (val) => {
        //console.log("[Signup Success] Received data", val);
        this.router.navigate(["/signup_success"], {
          state: { email: customer.email },
        });
      },
      (res) => {
        //console.log("[Signup Error]Received response", res);
        this.router.navigate(["/signup_fail"]);
      }
    );
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value)
    ) {
      const email: string = control.value;

      if (email !== undefined) {
        const result = email.search(
          /gmail\.com|outlook\.com|yahoo\.com|hotmail\.com/
        );
        //console.log("Result: ", result);
        if (result !== -1) {
          return { commonDomain: true };
        }
      }
    }
    return null;
  }

  checkInUse(email: string): boolean {
    this.apiService.getCustomerByEmail(email).subscribe((res) => {
      //console.log("res :", res);
      return false;
    });

    return false;
  }

  checkCommonDomain(email: string): boolean {
    if (email !== undefined) {
      const result = email.search(
        /gmail\.com|outlook\.com|yahoo\.com|hotmail\.com/
      );
      //console.log("Result: ", result);
      return result !== -1;
    }
    return false;
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
