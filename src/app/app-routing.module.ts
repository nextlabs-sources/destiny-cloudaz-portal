import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { SignupComponent } from "./signup/signup.component";
import { SignupActivateComponent } from "./signup/signup_activate.component";
import { SignupSuccessComponent } from "./signup/signup_success.component";
import { SignupFailComponent } from "./signup/signup_fail.component";
import { HomeComponent } from "./home/home.component";
import { QuestionComponent } from "./questionnare/question.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { ResourcePanelComponent } from "./resources/resource-panel.component";
import { CcVideoComponent } from "./resources/video/cc_video.component";

const routes: Routes = [
  // Home Page
  { path: "home", component: HomeComponent },
  // Signup Page
  { path: "signup", component: SignupComponent },
  // Signup Success Page
  { path: "signup_success", component: SignupSuccessComponent },
  // Signup Fail Page
  { path: "signup_fail", component: SignupFailComponent },
  // Signup Activate Page
  { path: "activate/:emailHash", component: SignupActivateComponent },
  // Questionaire Page
  { path: "questionnaire", component: QuestionComponent },
  // Questionaire Page
  { path: "maintenance", component: MaintenanceComponent },

  //   Single Page Resource
  { path: "resources", component: ResourcePanelComponent },

  //   DAE video
  { path: "videos", component: CcVideoComponent },

  // Redirect landing page to home
  { path: "", redirectTo: "/home", pathMatch: "full" },

  // 404 Page
  { path: "**", component: PageNotFoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // , useHash: true
}
