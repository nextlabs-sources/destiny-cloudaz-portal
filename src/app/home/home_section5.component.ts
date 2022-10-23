import { Component } from '@angular/core';

@Component({
  selector: 'home-section5',
  templateUrl: 'home_section5.html',
  styleUrls: ['home_section5.scss']
})
export class HomeSection5Component {

  developerUrl = "https://developer.nextlabs.com";

  gotoDeveloperSite():void {
    window.open(this.developerUrl, "_target");
  }
}

