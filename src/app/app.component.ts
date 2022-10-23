import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { environment } from "../environments/environment";
import { CacheService } from "./services/cache_service";

// declare ga as a function to access the JS code in TS
declare let gtag;

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "cloudaz-portal";

  drawerOpened = false;

  public showCookieConsent = true;

  constructor(
    private router: Router,
    public cache: CacheService,
    private cookieService: CookieService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-179977231-1", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    const cookie = this.cookieService.get("cloudaz.com-cookie");
    if (cookie != null && cookie != "") {
      this.showCookieConsent = false;
    }
  }

  updateCookieConsent(): void {
    this.cookieService.set("cloudaz.com-cookie", "yes");
    const pane = document.getElementById("consent-pane");
    pane.remove();
  }

  clickDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  gotoLogin(): void {
    this.drawerOpened = false;

    //let href:string = location.protocol + "//" + location.host + environment.cloudazConsoleUrl;
    //https://www.cloudaz.com/cas/clientredirect?client_name=azure&service=https://www.cloudaz.com:443/console/login/cas

    let rootHref: string = location.protocol + "//" + location.host;

    gtag("event", "login", {
      event_category: "cloudAz",
      event_label: "Login to cloudAz",
    });

    if (environment.production) {
      // To redirect cloudaz.com to www.cloudaz.com in production
      if (location.host.endsWith("cloudaz.com")) {
        rootHref = "https://www.cloudaz.com";
      }
    }

    let href: string = rootHref + environment.cloudazAdPart1URL + rootHref;
    href += environment.cloudazAdPart2URL;

    window.open(href, "_target");
  }

  gotoSignup(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/signup");
  }

  gotoWhy(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/home#why");
  }

  gotoAbac(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/home#abac");
  }

  gotoSdk(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/home#sdk");
  }

  gotoFeatures(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/home#features");
  }

  gotoReachUs(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/home#reach-us");
  }

  gotoResources(): void {
    this.drawerOpened = false;
    this.router.navigateByUrl("/resources");
  }
}
