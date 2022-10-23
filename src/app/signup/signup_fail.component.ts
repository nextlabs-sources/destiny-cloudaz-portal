import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { NgxCaptchaModule } from 'ngx-captcha';
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'signup-fail',
  templateUrl: 'signup_fail.html',
  styleUrls: ['signup_fail.scss']
})
export class SignupFailComponent implements OnInit, OnDestroy {
  
  sub: Subscription;

  email:string = "";

  constructor(private router: Router, private route: ActivatedRoute) {
      
  }

  ngOnInit() {
    //console.log("SignupFailComponent init");
  }

  ngOnDestroy() {
    //console.log("SignupFailComponent destroyed");
   }

}