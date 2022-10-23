import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-section3',
  templateUrl: 'home_section3.html',
  styleUrls: ['home_section3.scss']
})
export class HomeSection3Component implements OnInit, OnDestroy {

    ngOnInit() {
        //console.log("HomeSection3Component initialised");
    }

     ngOnDestroy() {
        //console.log("HomeSection3Component destroyed");

     }

     public gotoProduct() {
        window.open("https://www.nextlabs.com/products/technology/abac/", "_blank");
     }
}

