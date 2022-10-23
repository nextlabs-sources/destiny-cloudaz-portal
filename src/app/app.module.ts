import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppMaterialModule } from "./app.material.module";
import { NgxCaptchaModule } from "ngx-captcha";

import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { SignupComponent } from "./signup/signup.component";
import { SendEmailComponent } from "./email/send_email.component";
import { SignupSuccessComponent } from "./signup/signup_success.component";
import { SignupFailComponent } from "./signup/signup_fail.component";
import { SignupActivateComponent } from "./signup/signup_activate.component";
import { QuestionComponent } from "./questionnare/question.component";

import { HomeComponent } from "./home/home.component";
import { HomeSection1Component } from "./home/home_section1.component";
import { HomeSection2Component } from "./home/home_section2.component";
import { HomeSection3Component } from "./home/home_section3.component";
import { HomeSection4Component } from "./home/home_section4.component";
import { HomeSection5Component } from "./home/home_section5.component";
import { HomeSection6Component } from "./home/home_section6.component";
import { HomeSection7Component } from "./home/home_section7.component";

import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { CcVideoComponent } from "./resources/video/cc_video.component";
import { ResourcePanelComponent } from "./resources/resource-panel.component";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SignupComponent,
    SignupSuccessComponent,
    SignupFailComponent,
    SignupActivateComponent,
    SendEmailComponent,
    QuestionComponent,
    HomeComponent,
    CcVideoComponent,
    ResourcePanelComponent,
    MaintenanceComponent,
    HomeSection1Component,
    HomeSection2Component,
    HomeSection3Component,
    HomeSection4Component,
    HomeSection5Component,
    HomeSection6Component,
    HomeSection7Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCaptchaModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
