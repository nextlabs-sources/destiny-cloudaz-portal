import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home-section7',
  templateUrl: 'home_section7.html',
  styleUrls: ['home_section7.scss']
})
export class HomeSection7Component implements OnInit, OnDestroy {

    ngOnInit() {
        //console.log("HomeSection7Component initialised");
    }

     ngOnDestroy() {
        //console.log("HomeSection7Component destroyed");

     }
}

