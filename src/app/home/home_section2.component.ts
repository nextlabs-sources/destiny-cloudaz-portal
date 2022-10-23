import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'home-section2',
  templateUrl: 'home_section2.html',
  styleUrls: ['home_section2.scss']
})
export class HomeSection2Component implements OnInit, OnDestroy {

    showPanel: String = "false";

    showTab1: String = "true";

    showTab2: String = "false";

    showTab3: String = "false";

    showTab4: String = "false";

    dot1Color: String = "dot-color-active";

    dot2Color: String = "dot-color";

    dot3Color: String = "dot-color";

    dot4Color: String = "dot-color";

    private currentTab: number = 1;

    ngOnInit() {
        //console.log("HomeSection2Component initialised");
    }

    ngOnDestroy() {
        //console.log("HomeSection2Component destroyed");

    }

    public showIntegrationDetails() {
        //console.log("Clicked button");

        this.showPanel = (this.showPanel == "false") ? "true": "false";
    }

    public nextTab() {
        //console.log("Clicked next");
        //.log("Current Tab: ", this.currentTab);

        if(this.currentTab == 1) {
            this.showTab1 = "false";
            this.showTab2 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color-active";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 2) {
            this.showTab2 = "false";
            this.showTab3 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color-active";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 3) {
            this.showTab3 = "false";
            this.showTab4 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color-active";

            return;
        }

    }

    public prevTab() {
        console.log("Clicked previous");
        console.log("Current Tab: ", this.currentTab);
        if(this.currentTab == 4) {
            this.showTab4 = "false";
            this.showTab3 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color-active";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 3) {
            this.showTab3 = "false";
            this.showTab2 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color-active";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 2) {
            this.showTab2 = "false";
            this.showTab1 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color-active";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

            return;
        }

    }

    public gotoTab1() {
        this.currentTab = 1;
        this.showTab1 = "true";
        this.showTab2 = "false";
        this.showTab3 = "false";
        this.showTab4 = "false";

        this.dot1Color = "dot-color-active";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color";

   }

    public gotoTab2() {
        this.currentTab = 2;
        this.showTab1 = "false";
        this.showTab2 = "true";
        this.showTab3 = "false";
        this.showTab4 = "false";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color-active";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color";

    }

    public gotoTab3() {
        this.currentTab = 3;
        this.showTab1 = "false";
        this.showTab2 = "false";
        this.showTab3 = "true";
        this.showTab4 = "false";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color-active";
        this.dot4Color = "dot-color";

    }

    public gotoTab4() {
        this.currentTab = 4;
        this.showTab1 = "false";
        this.showTab2 = "false";
        this.showTab3 = "false";
        this.showTab4 = "true";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color-active";

    }

}

