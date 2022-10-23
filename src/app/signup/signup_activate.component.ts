import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "../../environments/environment";

import { ApiService } from "../services/api.service";

@Component({
  selector: "signup-activate",
  templateUrl: "signup_activate.html",
  styleUrls: ["signup_activate.scss"],
})
export class SignupActivateComponent implements OnInit, OnDestroy {
  sub: Subscription;
  showError = "false";
  emailHash = "";
  email = "";
  validationMessage = "";

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    //console.log("SignupActivateComponent init");
    //this.emailHash = this.route.snapshot.paramMap.get("emailHash");
    //this.email = this.route.snapshot.paramMap.get("email");

    this.sub = this.route.paramMap.subscribe((params) => {
      //console.log("Params: ", params);
      this.emailHash = params.get("emailHash");
      //this.email = params.get('email');
    });

    console.log("emailHash: ", this.emailHash);

    this.apiService.validateActivationCode(this.emailHash).subscribe(
      (val) => {
        //console.log("Activation response: ", val);
        this.validationMessage = "Your account has been successfully activated";
      },
      (res) => {
        //console.log("Activation error: ", res);
        this.validationMessage =
          "Email validation has failed. Please contact the support.";
      }
    );
  }

  isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  ngOnDestroy() {
    //console.log("SignupActivateComponent destroyed");
    if (this.sub != null) {
      this.sub.unsubscribe();
      this.validationMessage = "";
    }
  }
}
