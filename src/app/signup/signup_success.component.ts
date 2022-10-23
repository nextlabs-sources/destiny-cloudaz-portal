import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { NgxCaptchaModule } from 'ngx-captcha';
import { Router, ActivatedRoute } from "@angular/router"

import { ApiService } from '../services/api.service';

@Component({
  selector: 'signup-success',
  templateUrl: 'signup_success.html',
  styleUrls: ['signup_success.scss']
})
export class SignupSuccessComponent implements OnInit, OnDestroy {
  
  sub: Subscription;

  email:string = "";

  resendEmailMessage: string = "";

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {

    let state = this.router.getCurrentNavigation().extras.state;
    //console.log("[State]: ", state);
    if(state != null) {
      this.email = state['email'];
    }

  }
 
  resendEmail(): boolean {
    //console.log("Resend Email");

    this.apiService.resendEmail(this.email).subscribe(
      (val) =>{
        //console.log("Resend email response: ", val);
        this.resendEmailMessage = "A new email has been generated and send to " + this.email;
      },
      (res) => {
        //console.log("Resend email error: ", res);
        this.resendEmailMessage = "A new email has been generated and send to " + this.email;
      });

      return false;
  }

  ngOnInit() {
    //console.log("SignupSuccessComponent init");

    this.resendEmailMessage = "";
  }

  ngOnDestroy() {
    //console.log("SignupSuccessComponent destroyed");
    if(this.sub != null) {
      this.sub.unsubscribe();
    }

     this.resendEmailMessage = "";

  }

}
